const expressAsyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const mongoose = require("mongoose");

const saveBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const { postId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found!");
        }
        console.log("Post Id: ", postId)
        if (!user.savedPosts.includes(postId)) {
            const newList = user.savedPosts.push(postId);
            await user.save();
        }

        res.json({ savedBlogs: user.savedPosts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

const getSavedBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findById(userId).populate("savedPosts");

        if (!user) {
            return res.status(404).send("User not found!");
        }

        res.json({ savedPosts: user.savedPosts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

const removeSavedBlog = expressAsyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const { postId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send("User not found!");
        }

        user.savedPosts = user.savedPosts.filter((savedPostId) => savedPostId.toString() !== postId);
        await user.save();
        console.log(user.savedPosts)

        res.json({ savedBlogs: user.savedPosts });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

module.exports = { saveBlog, getSavedBlog, removeSavedBlog };
