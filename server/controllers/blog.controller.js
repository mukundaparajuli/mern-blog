const expressAsyncHandler = require("express-async-handler");
const Blog = require("../models/blog.model");
const { uploadToCloudinary } = require("../config/cloudinary");
const userModel = require("../models/user.model");
const blogModel = require("../models/blog.model");

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
    const { title, blogDescription, author, category } = req.body;
    const coverImage = req.file;
    const coverImagePath = coverImage?.path;

    console.log("File:", coverImage);
    console.log("Body:", req.body);

    if (!title || !blogDescription) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    let cloudinaryUrlCover = { url: null };

    if (coverImage) {
        try {
            cloudinaryUrlCover = await uploadToCloudinary(coverImagePath);
        } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return res.status(500).json({ message: "Error uploading image to Cloudinary" });
        }
    }

    const imageURL = cloudinaryUrlCover?.url || "https://bit.ly/blogImg";

    try {
        const blog = await Blog.create({
            title,
            blogDescription,
            coverImage: imageURL,
            author,
            category,
        });

        res.status(201).cookie("hi", "hello", {
            httpOnly: true,
        }).json({ blog });
    } catch (err) {
        console.error("Error occurred while creating blog:", err);
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

const deleteBlog = expressAsyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.blogid);
        if (!blog) {
            res.status(404).json({ message: "Blog not available" });
        }
        if (blog) {
            await Blog.findByIdAndDelete(req.params.blogid);
            res.status(200).json({ message: "Blog deleted successfully" });
        }
    } catch (err) {
        console.log("Blog deletion unsuccessful");
    }
})


// find by categories
const findByCategories = expressAsyncHandler(async (req, res) => {
    try {
        const category = req.params.category; // Access category directly
        console.log(category);

        if (category) {
            const blogs = await Blog.find({ category }); // Use category to find blogs
            console.log(blogs);
            res.status(200).json({ blogs }); // Return blogs
        } else {
            res.status(404).json({ message: "Category not found!" });
        }
    } catch (err) {
        console.log("Error occurred while fetching the blogs by category: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// find by search
const findBySearch = expressAsyncHandler(async (req, res) => {
    try {
        const searchTerm = req.params.searchTerm;
        if (searchTerm) {
            console.log(searchTerm);
            const blogs = await Blog.find({
                title: {
                    $regex: searchTerm,
                    $options: 'i' // Case-insensitive search
                }
            });
            console.log(blogs);
            res.status(200).json({ blogs });
        } else {
            res.status(404).json({ message: "Blog not found!" });
        }
    } catch (err) {
        console.log("Error occurred while fetching the blogs by search term: ", err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = { getAllBlogs, getOneBlog, createBlog, deleteBlog, findByCategories, findBySearch };
