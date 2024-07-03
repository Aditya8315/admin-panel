const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'User' }, // Default role is 'User'
}, { timestamps: true });

const User = mongoose.model('User', userSchema, 'user-data'); // Specify the collection name here

module.exports = User;