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

import TakeTest from "./pages/TakeTest";
import Library from "./pages/Library";
import Practice from "./pages/Practice";
import ContactUs from "./pages/ContactUs";
import ResourceDetails from "./pages/ResourceDetails";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/take_test" element={<TakeTest />} />
          <Route path="/library" element={<Library />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/resource_details/:id" element={<ResourceDetails/>}/>
          {/* Routes for admin dashboard*/}
          <Route path="/admin_home" element={<AdminHome/>} />
          <Route path="/manage_user" element={<ManageUser/>} />
          <Route path="/user_performance" element={<UserPerformance/>} />
          <Route path="/manage_resources" element={<ManageResources/>} />
          <Route path="/add_resource" element={<AddResource/>} />
          <Route path="/transactions" element={<Transcation/>} />
          <Route path="/performance" element={<Performance/>} />
        </Routes>
      </Router>

      {/* Toastify Container */}
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
