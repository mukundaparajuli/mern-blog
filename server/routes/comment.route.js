const express = require("express");
const { addComment, getAllComments, deleteComment } = require("../controllers/comment.controller");
const router = express.Router();

router.post('/addComment', addComment);
router.get('/getComment/:blogId', getAllComments)
router.delete('/delete/:commentId', deleteComment);

module.exports = router;