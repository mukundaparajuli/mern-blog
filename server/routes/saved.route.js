const express = require('express');
const { saveBlog, getSavedBlog, removeSavedBlog } = require('../controllers/saveBlog.controller');
const router = express.Router();

router.post('/savedPost/:userId', saveBlog);
router.get('/savedPost/:userId', getSavedBlog);
router.delete('/removePost/:userId', removeSavedBlog);

module.exports = router;