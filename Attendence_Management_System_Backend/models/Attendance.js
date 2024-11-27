// server/models/Attendance.js

const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  date: { type: Date, required: true },
  punchInTime: { type: String, required: true },
  selfieUrl: { type: String, required: true },
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
