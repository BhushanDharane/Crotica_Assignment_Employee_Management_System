// client/src/pages/StudentDashboard.js

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAttendanceHistory } from '../services/attendanceService';
import { getStudentProfile } from '../services/userService';

const StudentDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);

  useEffect(() => {
    // Fetch student profile
    getStudentProfile().then(data => setProfile(data));

    // Fetch attendance history (latest 5 entries)
    getAttendanceHistory().then(data => setAttendanceHistory(data.slice(0, 5)));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Welcome, {profile ? profile.name : 'Loading...'}</h2>
      
      <div className="dashboard-overview">
        <h3>Attendance Overview</h3>
        {attendanceHistory.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Punch-in Time</th>
                <th>Selfie</th>
              </tr>
            </thead>
            <tbody>
              {attendanceHistory.map((entry, index) => (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.punchInTime}</td>
                  <td><img src={entry.selfieUrl} alt="Selfie" width="50" height="50" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No attendance recorded yet.</p>
        )}
      </div>

      <div className="dashboard-actions">
        <Link to="/student/mark-attendance">
          <button>Mark Attendance</button>
        </Link>
        <Link to="/student/attendance-history">
          <button>View Attendance History</button>
        </Link>
        <Link to="/student/profile">
          <button>Edit Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
