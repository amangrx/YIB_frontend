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

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Routes for admin dashboard*/}
          <Route path="/admin-home" element={<AdminHome/>} />
          <Route path="/manage-user" element={<ManageUser/>} />
          <Route path="/user-performance" element={<UserPerformance/>} />
          <Route path="/resource-details" element={<ResourceDetails/>} />
          <Route path="/add-resource" element={<AddResource/>} />
          <Route path="/transactions" element={<Transcation/>} />
          <Route path="/performance" element={<Performance/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
