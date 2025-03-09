const express = require('express');
const { getAllBlogs, createBlog, addComment } = require('../controllers/blogController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getAllBlogs);
router.post('/', authMiddleware, createBlog);
// Route to handle comments
router.post('/:id/comments', addComment);

module.exports = router;
