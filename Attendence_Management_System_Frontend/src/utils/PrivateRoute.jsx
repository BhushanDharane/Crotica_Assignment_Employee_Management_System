// client/src/utils/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole, isAuthenticated } from '../services/authService';

const PrivateRoute = ({ children, roles }) => {
  const isLoggedIn = isAuthenticated();
  const userRole = getUserRole();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (!roles.includes(userRole)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
