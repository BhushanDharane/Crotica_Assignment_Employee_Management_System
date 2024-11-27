// server/controllers/teacherController.js
const Teacher = require('../models/Teacher');
const Attendance = require('../models/Attendance');
const Student = require('../models/Student');

// Fetch attendance for a specific day
exports.viewAttendance = async (req, res) => {
  const { date } = req.query;
  try {
    const attendance = await Attendance.find({ date })
      .populate('student', 'name')
      .populate('student', 'selfieUrl');
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance data' });
  }
};

// Fetch student list
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student list' });
  }
};

// Fetch student profile
exports.viewStudentProfile = async (req, res) => {
  const { studentId } = req.params;
  try {
    const student = await Student.findById(studentId)
      .populate('attendance');
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student profile' });
  }
};
