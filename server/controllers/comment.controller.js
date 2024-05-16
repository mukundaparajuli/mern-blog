const expressAsyncHandler = require("express-async-handler");
const Comment = require("../models/comment.model");
const userModel = require("../models/user.model");
const blogModel = require("../models/blog.model");

const addComment = expressAsyncHandler(async (req, res) => {
    try {
        const { commentText, userId, blogId } = await req.body;
        const user = await userModel.findById(userId);
        const blog = await blogModel.findById(blogId);

        console.log(user, blog)

        if (!user || !blog) {
            res.status(404).json({ message: "User or Blog is not found!" });
        }
        const comment = await Comment.create({ commentText, userId, blogId });
        console.log(comment);
        res.status(201).json(comment);
    } catch (error) {
        console.log("Error occured while adding a comment: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = { addComment };