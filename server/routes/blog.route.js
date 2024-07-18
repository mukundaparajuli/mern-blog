const express = require("express");
const { getAllBlogs, createBlog, getOneBlog, deleteBlog, findByCategories, findBySearch } = require("../controllers/blog.controller");
const { validateJWT } = require("../middlewares/validateJWT");
const { validateAdmin } = require("../middlewares/validateAdmin");
const upload = require("../middlewares/multer");
const router = express.Router();

router.get('/blogs', getAllBlogs);
router.get('/blogs/:blogid', getOneBlog);
router.post('/blogs', validateJWT, validateAdmin, upload.single('coverImage'), createBlog);
router.delete('/blogs/:blogid', validateJWT, validateAdmin, deleteBlog);
router.get('/blogs/category/:category', validateJWT, findByCategories);
router.get('/blogs/search/:searchTerm', validateJWT, findBySearch);
// router.post('/blogs/cover', validateJWT, upload.single("cover"), uploadCoverImage);

module.exports = router;