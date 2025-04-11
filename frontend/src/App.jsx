import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import WritingTest from "./pages/Expert/WritingTest";

import TakeTest from "./pages/TakeTest";
import Library from "./pages/Library";
import Practice from "./pages/Practice";
import ContactUs from "./pages/ContactUs";
import ResourceDetails from "./pages/ResourceDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./Context/AuthApi";

function App() {
  const { role } = useAuth();

  return (
    <>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/take_test" element={<TakeTest />} />
          <Route path="/library" element={<Library />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/test/writing" element={<WritingTest />} />

          {/* Protected route for all authenticated users */}
          <Route
            path="/resource_details/:id"
            element={
              <ProtectedRoute roles={["USER", "EXPERT", "ADMIN"]}>
                <ResourceDetails />
              </ProtectedRoute>
            }
          />

          {/* Expert routes */}
          <Route
            path="/expert/dashboard"
            element={
              <ProtectedRoute roles={["EXPERT"]}>
                <ExpertDashboard />
              </ProtectedRoute>
            }
          />

          {/* Admin-only routes */}
          <Route
            path="/admin_home"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AdminHome />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage_user"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <ManageUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user_performance"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <UserPerformance />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manage_resources"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <ManageResources />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add_resource"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <AddResource />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Transcation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/performance"
            element={
              <ProtectedRoute roles={["ADMIN"]}>
                <Performance />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      {/* Toast container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
