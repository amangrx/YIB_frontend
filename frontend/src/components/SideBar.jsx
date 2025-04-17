import React, { useState } from "react";
import {
  FaBook,
  FaMoneyBill,
  FaChartBar,
  FaSignOutAlt,
  FaUserCog,
  FaTachometerAlt,
  FaTools,
  FaUserTie,
  FaClipboardList,
  FaShoppingCart,
  FaHistory,
  FaStar,
} from "react-icons/fa";
import SidebarItem from "./SideBarItem";
import CustomButton from "./CustomButton";
import { useAuth } from "../Context/AuthContext";
import LogoutDialog from "./LogoutDialog";

const Sidebar = () => {
  const { role, logout } = useAuth();
  const [logoutOpen, setLogoutOpen] = useState(false);

  // Admin menu items
  const adminMenuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <FaTachometerAlt /> },
    { name: "Request", path: "/admin/request", icon: <FaUserCog /> },
    // { name: "User Analytics", path: "/user_analytics", icon: <FaChartBar /> },
    // { name: "Resources", path: "/admin_resources", icon: <FaBook /> },
    // { name: "Transactions", path: "/transactions", icon: <FaMoneyBill /> },
    // { name: "Reports", path: "/reports", icon: <FaClipboardList /> },
  ];

  // Expert menu items
  const expertMenuItems = [
    {
      name: "Dashboard",
      path: "/expert/dashboard",
      icon: <FaTachometerAlt />,
    },
    { name: "Upload Resources", path: "/expert/resource", icon: <FaBook /> },
    { name: "Upload Test", path: "/expert/test", icon: <FaTools /> },
  //   { name: "Performance", path: "/my_performance", icon: <FaChartBar /> },
  //   { name: "Profile", path: "/expert_profile", icon: <FaUserTie /> },
  ];

  // Customer menu items
  const customerMenuItems = [
    {
      name: "Dashboard",
      path: "/customer/dashboard",
      icon: <FaTachometerAlt />,
    },
    // { name: "Browse Resources", path: "/resources", icon: <FaBook /> },
    // { name: "My Purchases", path: "/purchases", icon: <FaShoppingCart /> },
    // { name: "Transaction History", path: "/transactions", icon: <FaHistory /> },
    // { name: "My Reviews", path: "/reviews", icon: <FaStar /> },
    // { name: "Profile", path: "/profile", icon: <FaUserTie /> },
  ];

  // Get menu items based on role
  const getMenuItems = () => {
    switch (role) {
      case "ADMIN":
        return adminMenuItems;
      case "EXPERT":
        return expertMenuItems;
      case "CUSTOMER":
        return customerMenuItems;
      default:
        return []; // Return empty array if role isn't recognized
    }
  };

  const menuItems = getMenuItems();

  const handleLogoutClick = () => {
    setLogoutOpen(true);
  };

  const handleLogoutConfirm = () => {
    logout(); // Use the logout function from your auth context
    setLogoutOpen(false);
  };

  const handleLogoutCancel = () => {
    setLogoutOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-seagreen text-white flex flex-col p-4 shadow-lg">
      {/* Dynamic Sidebar Header */}
      <h2 className="text-xl font-bold mb-6">
        {role === "ADMIN"
          ? "Admin Portal"
          : role === "EXPERT"
          ? "Expert Portal"
          : "Customer Portal"}
      </h2>

      {/* Sidebar Menu */}
      <nav className="flex flex-col space-y-4 flex-grow">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.name}
            path={item.path}
          />
        ))}
      </nav>

      {/* Logout Button at Bottom */}
      <div className="mt-auto">
        <CustomButton
          text="Logout"
          icon={FaSignOutAlt}
          onClick={handleLogoutClick}
        />
      </div>

      {/* Logout Confirmation Dialog */}
      <LogoutDialog
        open={logoutOpen}
        onClose={handleLogoutCancel}
        onConfirm={handleLogoutConfirm}
      />
    </div>
  );
};

export default Sidebar;
