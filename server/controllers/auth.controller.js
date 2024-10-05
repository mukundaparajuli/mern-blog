const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are mandatory!" });
    }
    try {
        const userExists = await User.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword });
        console.log(user);
        return res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json({ message: `Error occurred: ${err}` });
    }
});

const loginUser = expressAsyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "All fields are mandatory!" });
    }

    const validUser = await User.findOne({ username });
    if (!validUser) {
        return res.status(404).json({ message: "User doesn't exist!" });
    }

    const checkPassword = await bcrypt.compare(password, validUser.password);
    if (!checkPassword) {
        return res.status(401).json({ message: "Invalid password!" });
    }

    try {
        console.log(validUser);
        const userPayload = {
            username: validUser.username,
            email: validUser.email,
            imageURL: validUser.imageURL,
            isAdmin: validUser.isAdmin,
            userId: validUser._id,
        };

        const accessToken = jwt.sign({ user: userPayload }, process.env.SECRET_KEY, { expiresIn: '1d' });
        const refreshToken = jwt.sign({ user: userPayload }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

        const token = new Token({ userId: validUser._id, token: refreshToken });
        await token.save();

        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 1);

        return res.status(200).cookie('Token', accessToken, {
            secure: false,
            expires: expiryDate,
            httpOnly: true
        }).cookie('refreshToken', refreshToken, {
            secure: false,
            httpOnly: true
        }).json({ token: accessToken, success: true, ...userPayload });
    } catch (err) {
        return res.status(400).json({ message: "Error occurred while signing in!" });
    }
});

const refreshToken = expressAsyncHandler(async (req, res) => {
    console.log(req.cookies.refreshToken)
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const tokenDoc = await Token.findOne({ token: refreshToken });
    if (!tokenDoc) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                imageURL: user.imageURL,
                isAdmin: user.isAdmin,
                userId: user.userId,
            }
        }, process.env.SECRET_KEY, { expiresIn: '1d' });

        res.json({ accessToken: newAccessToken });
    });
});

const logOutUser = expressAsyncHandler(async (req, res) => {
    return res.status(200).clearCookie('Token', {
        secure: false,
        httpOnly: true,
    }).clearCookie('refreshToken', {
        secure: false,
        httpOnly: true
    }).json({ message: "Successfully logged out" });
});

module.exports = { registerUser, loginUser, refreshToken, logOutUser };
