const expressAsyncHandler = require("express-async-handler");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");
const Blog = require("../models/blog.model");

const addComment = expressAsyncHandler(async (req, res) => {
    const { commentText, userId, blogId } = req.body;

    try {
        const user = await User.findById(userId);
        const blog = await Blog.findById(blogId);

        if (!user || !blog) {
            return res.status(404).json({ message: "User or Blog not found!" });
        }

        const comment = await Comment.create({ commentText, userId, blogId });
        res.status(201).json(comment);
    } catch (error) {
        console.error("Error occurred while adding a comment: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const getAllComments = expressAsyncHandler(async (req, res) => {
    const { blogId } = req.params;

    if (!blogId) {
        return res.status(400).json({ message: "Blog ID is required!" });
    }

    try {
        const comments = await Comment.find({ blogId }).populate('userId', 'username', 'imageURL'); // Populate to include user info if needed
        res.status(200).json(comments);
    } catch (error) {
        console.error("Error occurred while fetching comments: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = { addComment, getAllComments };
