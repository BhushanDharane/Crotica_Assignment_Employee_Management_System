// client/src/services/api.js

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5173/teacher/students', // Backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('studentToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
