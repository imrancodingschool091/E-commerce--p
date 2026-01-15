import React from "react";
import { Navigate } from "react-router-dom";
import { getAccessToken } from "../../utils/token";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!getAccessToken();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
