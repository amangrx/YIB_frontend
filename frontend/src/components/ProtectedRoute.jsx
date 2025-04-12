// src/components/ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!role) return <Navigate to="/login" replace />;

  if (roles && !roles.includes(role)) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
