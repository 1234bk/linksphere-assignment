const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  role: {
    type: String, // e.g. 'student', 'developer'
  },
  college: {
    type: String,
  },
  skills: {
    type: [String], // e.g. ['React', 'Node']
  },
  age: {
    type: Number,
  },
  gender: {
    type: String, // e.g. 'male', 'female'
  },
  description: {
    type: String, // brief about user
  },
  working: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
