const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  coverImage: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    minlength: 200
  },
  excerpt: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'FilmFlare Team'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Blog', blogSchema);

