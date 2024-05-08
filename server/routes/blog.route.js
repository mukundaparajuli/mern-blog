const express = require("express");
const { getAllBlogs, createBlog } = require("../controllers/blog.controller");
const router = express.Router();

router.get('/blogs', getAllBlogs);
router.post('/blogs', createBlog);

module.exports = router;