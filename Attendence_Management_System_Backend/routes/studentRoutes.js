// server/routes/studentRoutes.js

const express = require('express');
const { registerStudent, loginStudent } = require('../controllers/authController');
const { markAttendance, getAttendanceHistory, getProfile, updateProfile } = require('../controllers/studentController');
const authMiddleware = require('../middlewares/authMiddleware');
const uploadMiddleware = require('../middlewares/uploadMiddleware');

const router = express.Router();

// Authentication Routes
router.post('/login', loginStudent);
router.post('/register', registerStudent);

// Student Routes
router.post('/attendance', authMiddleware, uploadMiddleware.single('selfie'), markAttendance);
router.get('/attendance-history', authMiddleware, getAttendanceHistory);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;
