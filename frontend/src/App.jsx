import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import TakeTest from "./pages/TakeTest";
import Library from "./pages/Library";
import Practice from "./pages/Practice";
import ContactUs from "./pages/ContactUs";
import ResourceDetails from "./pages/ResourceDetails";

import AdminHome from "./pages/Admin/AdminHome";
import Request from "./pages/Admin/Request";

import ExpertDashboard from "./pages/Expert/ExpertDashboard";
import AddResource from "./pages/Expert/AddResource";
import UploadTest from "./pages/Expert/UploadTest";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CusDashboard from "./pages/Customer/CusDashboard";

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

          {/* Customer routes */}
          <Route element={<ProtectedRoute roles={["CUSTOMER"]} />}>
            <Route path="/customer/dashboard" element={<CusDashboard />} />
            <Route path="/library/:id" element={<ResourceDetails />} />
          </Route>

          {/* Expert routes */}
          <Route element={<ProtectedRoute roles={["EXPERT"]} />}>
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/resource" element={<AddResource/>} />
            <Route path="/expert/test" element={<UploadTest />} />
          </Route>

          {/* Admin routes */}
          <Route element={<ProtectedRoute roles={["ADMIN"]} />}>
            <Route path="/admin/dashboard" element={<AdminHome />} />
            <Route path="/admin/request" element={<Request />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
