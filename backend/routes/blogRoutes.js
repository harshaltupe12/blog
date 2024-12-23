const express = require('express');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Route to create a new blog post (Protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: 'Title and content are required.' });
    }

    // Create a new blog post associated with the logged-in user
    const blogPost = new BlogPost({
      title,
      content,
      author: req.user.id, // Logged-in user's ID from middleware
    });

    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all blog posts (Public)
router.get('/', async (req, res) => {
  try {
    // Fetch all blog posts and populate author information
    const blogPosts = await BlogPost.find().populate('author', 'username');
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to add a comment to a blog post (Protected)
router.post('/:id/comments', authMiddleware, async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: 'Comment content is required.' });
    }

    // Create a new comment associated with the logged-in user
    const comment = new Comment({
      content,
      author: req.user.id, // Logged-in user's ID from middleware
      blog: req.params.id,
    });

    await comment.save();

    // Add the comment to the associated blog post
    const blogPost = await BlogPost.findById(req.params.id);
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found.' });
    }
    blogPost.comments.push(comment._id);
    await blogPost.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
