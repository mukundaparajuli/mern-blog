const express = require("express");
const { getAllBlogs, createBlog, getOneBlog } = require("../controllers/blog.controller");
const { validateJWT } = require("../middlewares/validateJWT");
const router = express.Router();

router.get('/blogs', validateJWT, getAllBlogs);
router.get('/blogs/:blogid', getOneBlog);
router.post('/blogs', createBlog);

module.exports = router;