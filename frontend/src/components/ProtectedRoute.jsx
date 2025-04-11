// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../Context/AuthApi";

// const ProtectedRoute = ({ children, roles }) => {
//   const { role } = useAuth();

//   if (!role) {
//     // Not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && !roles.includes(role)) {
//     // Logged in but doesn't have permission
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthApi";

const ProtectedRoute = ({ children, roles }) => {
  const { role, loading } = useAuth();

  if (loading) {
    // You can replace this with a spinner component
    return <div>Loading...</div>;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
