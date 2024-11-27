// server/routes/teacherRoutes.js
const express = require('express');
const router = express.Router();
const { viewAttendance, getStudents, viewStudentProfile } = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/attendance', authMiddleware, viewAttendance); // Get attendance list
router.get('/students', authMiddleware, getStudents); // Get student list
router.get('/students/:studentId', authMiddleware, viewStudentProfile); // Get student profile

module.exports = router;
