const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema);
