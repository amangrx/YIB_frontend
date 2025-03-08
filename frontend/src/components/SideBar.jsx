import React from "react";
import {
  FaHome,
  FaBook,
  FaMoneyBill,
  FaChartBar,
  FaSignOutAlt,
  FaUserCog,  
  FaTachometerAlt,  
} from "react-icons/fa";
import SidebarItem from "./SideBarItem";
import CustomButton from "./CustomButton";

const Sidebar = () => {
  const menuItems = [
    { name: "Home", path: "/admin-home", icon: <FaHome /> },
    { name: "Manage User", path: "/manage-user", icon: <FaUserCog /> },
    { name: "User performance", path: "/user-performance", icon: <FaTachometerAlt /> }, // Changed to FaTachometerAlt
    { name: "Resource Details", path: "/resource-details", icon: <FaBook /> },
    { name: "Add Resource", path: "/add-resource", icon: <FaBook /> },
    { name: "Transactions", path: "/transactions", icon: <FaMoneyBill /> },
    { name: "Performance", path: "/performance", icon: <FaChartBar /> },
  ];

  const handleLogout = () => {
    console.log("Logging out...");
    // Implement actual logout logic here (e.g., clearing tokens, redirecting)
  };

  return (
    <div className="h-screen w-64 bg-seagreen text-white flex flex-col p-4 shadow-lg">
      {/* Sidebar Header */}
      <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-4 flex-grow">
        {menuItems.map((item, index) => (
          <SidebarItem key={index} icon={item.icon} text={item.name} path={item.path} />
        ))}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="mt-auto">
        <CustomButton text="Logout" icon={FaSignOutAlt} onClick={handleLogout} />
      </div>
    </div>
  );
};

export default Sidebar;
