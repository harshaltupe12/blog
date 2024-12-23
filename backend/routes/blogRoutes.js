const express = require('express');
const BlogPost = require('../models/BlogPost');
const Comment = require('../models/Comment');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const blogPost = new BlogPost({ title, content, author });
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username');
    res.status(200).json(blogPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/:id/comments', async (req, res) => {
  try {
    const { content, author } = req.body;
    const comment = new Comment({ content, author, blog: req.params.id });
    await comment.save();

    const blogPost = await BlogPost.findById(req.params.id);
    blogPost.comments.push(comment._id);
    await blogPost.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
