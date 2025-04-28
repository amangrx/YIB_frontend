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

import AdminHome from "./pages/Admin/AdminHome";
import Request from "./pages/Admin/Request";

import ExpertDashboard from "./pages/Expert/ExpertDashboard";
import MyUploads from "./pages/Expert/MyUploads";
import AddResource from "./pages/Expert/AddResource";
import UploadTest from "./pages/Expert/UploadTest";
import ReviewTest from "./pages/Expert/ReviewTest";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import CusDashboard from "./pages/Customer/CusDashboard";
import ResourceDetails from "./pages/Customer/ResourceDetails";
import TestAnswer from "./pages/Customer/TestAnswer";
import UserTest from "./pages/Customer/UserTest";
import ListeningReadingAnswer from "./pages/Customer/ListeningReadingAnswer";
import ReadingListeningUserTest from "./pages/Customer/UserTestCatReadListen";
import PaymentSuccess from "./pages/Customer/PaymentSuccess";

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
            <Route path="/library/:resourceId" element={<ResourceDetails />} />
            <Route path="/answers/:questionId" element={<TestAnswer/>}/>
            <Route path="/test/:questionId" element={<UserTest/>} />
            <Route path="/reading_listening_ans/:questionId" element={<ListeningReadingAnswer/>}/>
            <Route path="/test/reading-listening/:questionId" element={<ReadingListeningUserTest/>}/>
            <Route path="/payment/success" element={<PaymentSuccess/>}/>
          </Route>

          {/* Expert routes */}
          <Route element={<ProtectedRoute roles={["EXPERT"]} />}>
            <Route path="/expert/dashboard" element={<ExpertDashboard />} />
            <Route path="/expert/resource" element={<AddResource/>} />
            <Route path="/expert/my-uploads" element={<MyUploads/>} />
            <Route path="/expert/test" element={<UploadTest />} />
            <Route path="/expert/review/test" element={<ReviewTest/>}/>
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
