// AdminProtected.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtected = ({ isAdmin, children }) => {
  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminProtected;
