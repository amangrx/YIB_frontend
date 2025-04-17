// src/components/PublicRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const PublicRoute = ({ restricted = false, children }) => {
  const { role, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  // For restricted routes (like home page)
  if (restricted && role) {
    // Redirect admins/experts away
    if (role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
    if (role === "EXPERT") return <Navigate to="/expert/dashboard" replace />;
    // For customers, render the children directly
    return children || <Outlet />;
  }

  // For non-restricted public routes
  return children || <Outlet />;
};

export default PublicRoute;