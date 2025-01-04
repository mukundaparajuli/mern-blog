const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const { generateVerificationToken } = require("../utils/verification-token");
const { sendVerificationEmail } = require("../utils/send-mail");

// Utility to check secure cookies
const isProduction = process.env.NODE_ENV === "production";

// Register User
const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const userExists = await User.findOne({
            $or: [{ email: email.toLowerCase() }, { username }]
        });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        const verificationToken = generateVerificationToken(user._id);
        await sendVerificationEmail(user.email, verificationToken);

        res.status(200).json({
            user: { username: user.username, email: user.email, isVerified: user.isVerified },
            message: "Verification email sent. Please verify your email to log in.",
        });
    } catch (err) {
        res.status(500).json({ message: `Registration failed: ${err.message}` });
    }
});

// Login User
const loginUser = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const validUser = await User.findOne({ username });
        if (!validUser) {
            return res.status(404).json({ message: "User does not exist!" });
        }

        const passwordMatch = await bcrypt.compare(password, validUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: "Invalid password!" });
        }

        if (!validUser.isVerified) {
            const verificationToken = generateVerificationToken(validUser._id);
            await sendVerificationEmail(validUser.email, verificationToken);
            return res.status(403).json({ message: "Please verify your email before logging in." });
        }

        const userPayload = {
            username: validUser.username,
            email: validUser.email,
            imageURL: validUser.imageURL,
            isAdmin: validUser.isAdmin,
            userId: validUser._id,
        };

        const accessToken = jwt.sign({ user: userPayload }, process.env.SECRET_KEY, { expiresIn: "1d" });
        const refreshToken = jwt.sign({ user: userPayload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

        await Token.create({ userId: validUser._id, token: refreshToken });

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);

        res.status(200)
            .cookie("Token", accessToken, {
                secure: isProduction,
                httpOnly: true,
                expires: expiryDate,
            })
            .cookie("refreshToken", refreshToken, {
                secure: isProduction,
                httpOnly: true,
            })
            .json({ token: accessToken, success: true, ...userPayload });
    } catch (err) {
        res.status(500).json({ message: `Login failed: ${err.message}` });
    }
});

// Refresh Token
const refreshToken = expressAsyncHandler(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (!refreshToken) return res.status(401).json({ message: "Unauthorized" });

    try {
        const tokenDoc = await Token.findOne({ token: refreshToken });
        if (!tokenDoc) return res.status(403).json({ message: "Invalid token" });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
            if (err) return res.status(403).json({ message: "Token expired or invalid" });

            const validUser = await User.findById(user.user.userId);
            if (!validUser) return res.status(404).json({ message: "User not found" });

            const userPayload = {
                username: validUser.username,
                email: validUser.email,
                imageURL: validUser.imageURL,
                isAdmin: validUser.isAdmin,
                userId: validUser._id,
            };

            const newAccessToken = jwt.sign({ user: userPayload }, process.env.SECRET_KEY, { expiresIn: "1d" });
            const newRefreshToken = jwt.sign({ user: userPayload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

            await Token.findOneAndUpdate({ token: refreshToken }, { token: newRefreshToken });

            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + 1);

            res.status(200)
                .cookie("Token", newAccessToken, {
                    secure: isProduction,
                    httpOnly: true,
                    expires: expiryDate,
                })
                .cookie("refreshToken", newRefreshToken, {
                    secure: isProduction,
                    httpOnly: true,
                })
                .json({ token: newAccessToken, refreshToken: newRefreshToken, success: true, ...userPayload });
        });
    } catch (err) {
        res.status(500).json({ message: `Token refresh failed: ${err.message}` });
    }
});

// Logout User
const logOutUser = expressAsyncHandler(async (req, res) => {
    res.status(200)
        .clearCookie("Token", { secure: isProduction, httpOnly: true })
        .clearCookie("refreshToken", { secure: isProduction, httpOnly: true })
        .json({ message: "Successfully logged out" });
});

module.exports = { registerUser, loginUser, refreshToken, logOutUser };
