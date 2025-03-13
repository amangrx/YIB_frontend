import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminHome from "./pages/Admin/AdminHome";
import ManageUser from "./pages/Admin/ManageUser";
import Transcation from "./pages/Admin/Transaction"; 
import Performance from "./pages/Admin/Performance";
import UserPerformance from "./pages/Admin/UserPerformance";
import ResourceDetails from "./pages/Admin/ResourceDetails";
import AddResource from "./pages/Admin/AddResource";
import TakeTest from "./pages/TakeTest";
import Library from "./pages/Library";
import Practice from "./pages/Practice";
import ContactUs from "./pages/ContactUs";

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
          
          {/* Routes for admin dashboard*/}
          <Route path="/admin_home" element={<AdminHome/>} />
          <Route path="/manage_user" element={<ManageUser/>} />
          <Route path="/user_performance" element={<UserPerformance/>} />
          <Route path="/resource_details" element={<ResourceDetails/>} />
          <Route path="/add_resource" element={<AddResource/>} />
          <Route path="/transactions" element={<Transcation/>} />
          <Route path="/performance" element={<UserPerformance/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
