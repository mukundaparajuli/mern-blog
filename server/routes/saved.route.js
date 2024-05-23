const express = require('express');
const { saveBlog, getSavedBlog } = require('../controllers/saveBlog.controller');
const router = express.Router();

router.post('/savedPost/:userId', saveBlog);
router.get('/savedPost/:userId', getSavedBlog);

module.exports = router;