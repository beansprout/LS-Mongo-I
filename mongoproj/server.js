
// node require
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// ---connect modules and database ------

// connect express server to mongoDB server
mongoose.connect('mongodb://localhost/user_mongoI_proj');

// connect server to User schema model
const User = require('./models/user');
const BlogPost = require ('./models/blogPost.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());


// ---- home route ----- server test ------
app.get('/', (req, res) => {
  res.send('hello world!');
});

// ------ user routes --------------------------

// User.find with {} empty object finds all users
// route gets array of all users
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err);
    res.send(users);
  });
});

// get a single user by id
app.get('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) res.send(err);
    res.send(user);
  });
});

// create new user
app.post('/users', (req, res) => {
  const user = new User(req.body);
  user.save((err, response) => {
    if (err) {
      return res.send(err);
    }
    return res.send('success! new user created');
  });
});

// removes user by id
app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      return res.send(err);
    }
    return res.send('user deleted');
  });
});

// ------ blog routes --------------------------

app.get('/posts', (req, res) => {
  BlogPost.find({}, (err, posts) => {
    if (err) {
      return res.send(err);
    }
    return res.send(posts);
  });
});

app.post('/posts', (req, res) => {
  const post = new BlogPost(req.body);
  post.save((err, response) => {
    if (err) {
      return res.send(err);
    }
    return res.send('success! post saved.');
  });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
