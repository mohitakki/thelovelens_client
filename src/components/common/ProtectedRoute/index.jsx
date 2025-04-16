import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const ProtectedRoute = ({ children }) => {
  const { getItem } = useLocalStorage();
  const location = useLocation();

  const token = getItem('token');
  console.log(token);
  if (!token) {
    // Redirect to login page but save the attempted url
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute; 