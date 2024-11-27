// server/controllers/adminController.js
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin login
exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Manage Teachers: Add Teacher
exports.addTeacher = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const teacher = new Teacher({ name, email, password, role });
    await teacher.save();
    res.json({ message: 'Teacher added successfully', teacher });
  } catch (error) {
    res.status(500).json({ message: 'Error adding teacher' });
  }
};

// Manage Users: Get all teachers and students
exports.getUsers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    const students = await Student.find();
    res.json({ teachers, students });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};

// Restrict User Login
exports.restrictUser = async (req, res) => {
  const { userId, status } = req.body;
  try {
    const user = await Teacher.findById(userId) || await Student.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.status = status;
    await user.save();
    res.json({ message: 'User status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user status' });
  }
};

// Change Admin Password
exports.changeAdminPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const admin = await Admin.findById(req.admin.id);
    const isMatch = await bcrypt.compare(oldPassword, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

    admin.password = await bcrypt.hash(newPassword, 10);
    await admin.save();
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error changing password' });
  }
};
