// client/src/services/attendanceService.js
import { api } from './api';

export const getAttendance = async () => {
  const response = await api.get('/teacher/attendance');
  return response.data;
};
