/*
Implement the following routes but have them utilize a database to achieve data persistence.
* [POST] `/users` This route should save a new user to the server. (This is just in memory and will not persist if you restart the server.)
* [GET] `/users` This route will return an array of all users.
* [GET] `/users/:id` This route will return the user with the matching `id` (`_id` on the db document) property.
* [DELETE] `/users/:id` This route should delete the specified user.
*/

//node require
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/my-cool-app');

const User = require('./models/user');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// simple assignment to server address
app.get('/', (req, res) => {
  res.send('hello world!');
});


app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});