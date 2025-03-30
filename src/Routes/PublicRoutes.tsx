import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

export default PublicRoutes;
