

// client/src/components/AttendanceHistory.js
import React, { useEffect, useState } from 'react';
import { getAttendance } from '../services/attendanceService';

const AttendanceHistory = () => {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    getAttendance().then((data) => setAttendance(data));
  }, []);

  return (
    <div className="attendance-history">
      <h2>Attendance History</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Punch-in Time</th>
            <th>Selfie</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((entry) => (
            <tr key={entry._id}>
              <td>{entry.student.name}</td>
              <td>{entry.date}</td>
              <td>{entry.punchInTime}</td>
              <td><img src={entry.selfieUrl} alt="Selfie" width="50" height="50" /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceHistory;
