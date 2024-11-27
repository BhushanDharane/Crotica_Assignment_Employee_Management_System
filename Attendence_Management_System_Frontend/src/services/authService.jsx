// client/src/services/authService.js
export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };
  
  export const getUserRole = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user?.role || null;
  };
  