const express = require("express");
const { getAllBlogs, createBlog, getOneBlog, deleteBlog, findByCategories, findBySearch } = require("../controllers/blog.controller");
const { validateJWT } = require("../middlewares/validateJWT");
const { validateAdmin } = require("../middlewares/validateAdmin");
const router = express.Router();

router.get('/blogs', validateJWT, getAllBlogs);
router.get('/blogs/:blogid', getOneBlog);
router.post('/blogs', validateJWT, validateAdmin, createBlog);
router.delete('/blogs/:blogid', validateJWT, validateAdmin, deleteBlog);
router.get('/blogs/category/:category', validateJWT, findByCategories);
router.get('/blogs/search/:searchTerm', validateJWT, findBySearch);

module.exports = router;