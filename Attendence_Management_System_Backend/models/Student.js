// server/models/Student.js

const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  contactInfo: { type: String },
  profilePicture: { type: String },
});

module.exports = mongoose.model('Student', StudentSchema);
