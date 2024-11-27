// client/src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { getUsers } from '../services/userService';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setTeachers(data.teachers);
      setStudents(data.students);
    });
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>

      <h3>Teachers</h3>
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher._id}>
            <Link to={`/admin/teacher/${teacher._id}`}>{teacher.name}</Link>
          </li>
        ))}
      </ul>

      <h3>Students</h3>
      <ul>
        {students.map((student) => (
          <li key={student._id}>
            <Link to={`/admin/student/${student._id}`}>{student.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
