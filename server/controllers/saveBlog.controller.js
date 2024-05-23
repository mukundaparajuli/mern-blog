const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const saveBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const { postId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            res.status(404).send("User not found!");
        }

        if (!user.savedPosts.includes(postId)) {
            user.savedPosts.push(postId);
            await user.save();
        }

        res.json({ message: 'Post saved successfully', savedPosts: user.savedPosts });
    } catch (error) {
        console.log(error);
    }
});

const getSavedBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate("savedPosts");

        if (!user) {
            res.status(404).send("User not found!");
        }

        res.status(201).json({ savedPosts: user.savedPosts });
    } catch (error) {
        console.log(error);
    }
})

module.exports = { saveBlog, getSavedBlog };