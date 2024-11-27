// server/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const Teacher = require('../models/Teacher');
const Admin = require('../models/Admin');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = await Admin.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.student = await Student.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.teacher = await Teacher.findById(decoded.id);
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
