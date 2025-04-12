import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/Admin/AdminHome";
import ManageUser from "./pages/Admin/ManageUser";
import Transcation from "./pages/Admin/Transaction";
import Performance from "./pages/Admin/Performance";
import UserPerformance from "./pages/Admin/UserPerformance";
import ManageResources from "./pages/Admin/ManageResources";
import AddResource from "./pages/Admin/AddResource";
import ExpertDashboard from "./pages/Expert/ExpertDashboard";
import AddResourceExpert from "./pages/Expert/AddResource";
import TakeTest from "./pages/TakeTest";
import Library from "./pages/Library";
import Practice from "./pages/Practice";
import ContactUs from "./pages/ContactUs";
import ResourceDetails from "./pages/ResourceDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

// src/App.js
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <Register />
              </PublicRoute>
            }
          />

          {/* Home route - accessible to everyone, but redirects admins/experts */}
          <Route
            path="/"
            element={
              <PublicRoute restricted>
                <Home />
              </PublicRoute>
            }
          />

          <Route
            path="/take_test"
            element={
              <PublicRoute restricted>
                <TakeTest />
              </PublicRoute>
            }
          />

          <Route
            path="/library"
            element={
              <PublicRoute restricted>
                <Library />
              </PublicRoute>
            }
          />

          <Route
            path="/practice"
            element={
              <PublicRoute restricted>
                <Practice />
              </PublicRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <PublicRoute restricted>
                <ContactUs />
              </PublicRoute>
            }
          />

          {/* Protected routes */}
          <Route
            element={<ProtectedRoute roles={["CUSTOMER", "EXPERT", "ADMIN"]} />}
          >
            <Route path="/resource_details/:id" element={<ResourceDetails />} />
          </Route>

          {/* Expert routes */}
          <Route element={<ProtectedRoute roles={["EXPERT"]} />}>
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/resource" element={<AddResourceExpert />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
            <Route path="/admin_home" element={<AdminHome />} />
            {/* ... other admin routes */}
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
