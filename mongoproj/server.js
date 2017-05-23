/*
Implement the following routes but have them utilize a database to achieve data persistence.
* [POST] `/users` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.)
* [GET] `/users` This route will return an array of all users.
* [GET] `/users/:id` This route will return the user with the matching `id` (`_id` on the db document) property.
* [DELETE] `/users/:id` This route should delete the specified user.
*/

// node require
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/user_mongoI_proj');

const User = require('./models/user');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// simple assignment to server address
app.get('/', (req, res) => {
  res.send('hello world!');
});

// User.find with {} empty object finds all users
app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) res.send(err);
    res.send(users);
  });
});

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


app.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  User.findByIdAndRemove(id, (err, user) => {
    if (err) {
      return res.send(err);
    }
    return res.send('user deleted');
  });
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
