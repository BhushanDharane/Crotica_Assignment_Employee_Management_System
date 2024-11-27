// server/controllers/studentController.js

const Student = require('../models/Student');
const Attendance = require('../models/Attendance');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerStudent = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const student = new Student({ name, email, password: hashedPassword });

  await student.save();
  res.status(201).json({ message: 'Student registered successfully' });
};

module.exports.loginStudent = async (req, res) => {
  const { email, password } = req.body;
  const student = await Student.findOne({ email });
  
  if (!student || !(await bcrypt.compare(password, student.password))) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

module.exports.markAttendance = async (req, res) => {
  const { selfieUrl } = req.body;
  const studentId = req.user._id;
  const punchInTime = new Date().toISOString();
  
  const attendance = new Attendance({
    studentId,
    date: new Date(),
    punchInTime,
    selfieUrl,
  });

  await attendance.save();
  res.status(200).json({ message: 'Attendance marked successfully' });
};

module.exports.getAttendanceHistory = async (req, res) => {
  const studentId = req.user._id;
  const attendance = await Attendance.find({ studentId }).sort({ date: -1 });
  res.json(attendance);
};

module.exports.getProfile = async (req, res) => {
  const student = await Student.findById(req.user._id);
  res.json(student);
};

module.exports.updateProfile = async (req, res) => {
  const { name, contactInfo, profilePicture } = req.body;
  const student = await Student.findByIdAndUpdate(req.user._id, { name, contactInfo, profilePicture }, { new: true });
  res.json(student);
};
