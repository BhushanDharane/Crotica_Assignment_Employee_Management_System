// server/controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

module.exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });

  if (!student || !(await bcrypt.compare(password, student.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const student = new Student({ name, email, password: hashedPassword });
  await student.save();

  res.status(201).json({ message: 'Student registered successfully' });
};
