// client/src/components/MarkAttendance.js

import React, { useState } from 'react';
import { markAttendance } from '../services/attendanceService';

const MarkAttendance = () => {
  const [selfie, setSelfie] = useState(null);

  const handleSelfieCapture = (e) => {
    setSelfie(URL.createObjectURL(e.target.files[0]));
  };

  const handleAttendanceSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('selfie', selfie);
      await markAttendance(formData);
      alert('Attendance marked successfully');
    } catch (error) {
      alert('Failed to mark attendance');
    }
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <input type="file" accept="image/*" onChange={handleSelfieCapture} />
      {selfie && <img src={selfie} alt="Selfie preview" width="100" height="100" />}
      <button onClick={handleAttendanceSubmit}>Mark Attendance</button>
    </div>
  );
};

export default MarkAttendance;
