const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    lowercase: true,
  },
  password: String,
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;
