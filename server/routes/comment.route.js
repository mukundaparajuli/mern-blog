const express = require("express");
const { addComment, getAllComments } = require("../controllers/comment.controller");
// const { getAllBlogs } = require("../controllers/blog.controller");
const router = express.Router();

router.post('/addComment', addComment);
router.get('/getComment/:blogId', getAllComments)

module.exports = router;