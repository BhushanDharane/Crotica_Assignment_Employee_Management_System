// client/src/pages/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/userService';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getStudents().then((data) => setStudents(data));
  }, []);

  return (
    <div className="teacher-dashboard">
      <h2>Teacher Dashboard</h2>

      <div className="student-list">
        <h3>Student List</h3>
        <ul>
          {students.map((student) => (
            <li key={student._id}>
              <Link to={`/teacher/students/${student._id}`}>{student.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TeacherDashboard;
