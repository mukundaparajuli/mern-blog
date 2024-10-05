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
    console.log("eta hai eta:", blogId)

    if (!blogId) {
        return res.status(400).json({ message: "Blog ID is required!" });
    }

    try {
        const comments = await Comment.find({ blogId }).populate('userId', 'username _id imageURL')
        res.status(200).json(comments);
        console.log(comments)
    } catch (error) {
        console.error("Error occurred while fetching comments: ", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// delete a comment
const deleteComment = expressAsyncHandler(async (req, res) => {
    const { commentId } = req.params;
    console.log("eta hai eta", commentId)

    if (!commentId) {
        return res.status(404).json({ message: "Comment ID is required!" });
    }

    try {
        const comment = await Comment.findByIdAndDelete(commentId);
        console.log(comment);
        res.status(200).json(comment)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

module.exports = { addComment, getAllComments, deleteComment };
