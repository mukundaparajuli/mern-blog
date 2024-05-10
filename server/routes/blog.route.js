const express = require("express");
const { getAllBlogs, createBlog, getOneBlog } = require("../controllers/blog.controller");
const router = express.Router();

router.get('/blogs', getAllBlogs);
router.get('/blogs/:blogid', getOneBlog);
router.post('/blogs', createBlog);

module.exports = router;