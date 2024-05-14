const expressAsyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");

const getAllBlogs = expressAsyncHandler(async (req, res) => {
    try {
        console.log("blog: ", await req.body);
        const blogs = await Blog.find();
        res.json({ blogs });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const createBlog = expressAsyncHandler(async (req, res) => {
    const { title, blogDescription, coverImage, author } = req.body;
    console.log(req.body);
    if (!title || !blogDescription) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const blog = await Blog.create({ title, blogDescription, coverImage, author });
        res.status(201).cookie("hi", "hello", {
            httpOnly: true,
        }).json({ blog });
    } catch (err) {
        console.log("Error occurred: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

const getOneBlog = expressAsyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findOne({ _id: req.params.blogid });
        if (!blog) {
            res.status(404).json({ message: "Blog not available" });
        }

        blog && res.json({ blog });
    } catch (err) {
        console.log("Error occured while finding the blog!");
    }
})

module.exports = { getAllBlogs, getOneBlog, createBlog };
