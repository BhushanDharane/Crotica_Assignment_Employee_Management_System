// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Login from './components/Login';
import AddTeacher from './components/AddTeacher';
import Profile from './components/Profile';
import PrivateRoute from './utils/PrivateRoute';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route 
            path="/admin/dashboard" 
            element={<PrivateRoute roles={['admin']}><AdminDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/admin/teacher/add" 
            element={<PrivateRoute roles={['admin']}><AddTeacher /></PrivateRoute>} 
          />
          <Route 
            path="/admin/profile" 
            element={<PrivateRoute roles={['admin']}><Profile /></PrivateRoute>} 
          />

          {/* Teacher Routes */}
          <Route 
            path="/teacher/dashboard" 
            element={<PrivateRoute roles={['teacher']}><TeacherDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/teacher/profile" 
            element={<PrivateRoute roles={['teacher']}><Profile /></PrivateRoute>} 
          />

          {/* Student Routes */}
          <Route 
            path="/student/dashboard" 
            element={<PrivateRoute roles={['student']}><StudentDashboard /></PrivateRoute>} 
          />
          <Route 
            path="/student/profile" 
            element={<PrivateRoute roles={['student']}><Profile /></PrivateRoute>} 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
