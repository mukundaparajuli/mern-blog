const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = expressAsyncHandler(async (req, res) => {
    const { username, email, password } = await req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: "All fields are mandatory!" });
    }
    try {
        const userExists = await User.findOne({ email } || { username });
        if (userExists) {
            res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ username, email, password: hashedPassword })
        console.log(user);
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ message: `Error occured: ${err}` });
    }
});


// login user
const loginUser = expressAsyncHandler(async (req, res) => {
    const { username, password } = await req.body();
    if (!username || !password) {
        res.status(400).json({ message: "All fields are mandatory1" });
    }

    const validUser = await User.findOne({ username });
    if (!validUser) {
        res.status(404).json({ message: "User doesn't exist!" });
    }

    const checkPassword = await bcrypt.compare(password, validUser.password);
    if (!checkPassword) {
        res.status(401).json({ message: "Invalid password!" });
    }

    try {
        const accessToken = jwt.sign({
            user: {
                username: validUser.username,
                email: validUser.email,
                imageURL: validUser.imageURL,
                isAdmin: validUser.isAdmin
            }
        }, process.env.SECRET_KEY, { expiresIn: "1d" });

        res.status(200).json({ accessToken });
    } catch (err) {
        res.status(400).json({ message: "Error occured while signing in!" });
    }
})

module.exports = { registerUser, loginUser };