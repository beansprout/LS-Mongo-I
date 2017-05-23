const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: {type: String, unique: true},
  description: {type: String, unique: true},
  body: {type: String},
  author: String,
  comments: [{ comment: String, date: Date }],
  date: {type: Date, default: Date.now },
});

const BlogPostModel = mongoose.model('BlogPostModel', blogPostSchema);

module.exports = BlogPostModel;
