// client/src/services/userService.js
import { api } from '../services/api.jsx';

export const getStudents = async () => {
  const response = await api.get('/teacher/students');
  return response.data;
};
