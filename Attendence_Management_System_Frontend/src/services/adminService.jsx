// client/src/services/adminService.js
import api from './api';

export const getUsers = async () => {
  const res = await api.get('/admin/users');
  return res.data;
};

export const addTeacher = async (teacherData) => {
  const res = await api.post('/admin/teacher', teacherData);
  return res.data;
};
