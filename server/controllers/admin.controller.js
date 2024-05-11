const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const getUsers = expressAsyncHandler(async (req, res) => {
    try {
        const users = User.find();
        res.json({ users });
    } catch (err) {
        console.log("Error occured while fetcing the users")
    }
});

module.exports = { getUsers };