import React from "react";
import Sidebar from "../../components/SideBar";

const AdminHome = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <div className="p-4">{/* Main content area */}</div>
      </div>
    </div>
  );
};

export default AdminHome;
