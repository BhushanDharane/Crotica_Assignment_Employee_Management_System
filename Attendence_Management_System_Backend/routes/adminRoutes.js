// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { loginAdmin, addTeacher, getUsers, restrictUser, changeAdminPassword } = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

// Admin login
router.post('/login', loginAdmin);

// Manage Teachers: Add Teacher
router.post('/teacher', authMiddleware, addTeacher);

// Manage Users: View all teachers and students
router.get('/users', authMiddleware, getUsers);

// Restrict User Login
router.post('/restrict-user', authMiddleware, restrictUser);

// Change Admin Password
router.post('/change-password', authMiddleware, changeAdminPassword);

module.exports = router;
