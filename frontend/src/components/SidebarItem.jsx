import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, path }) => {
  return (
    <Link to={path} className="flex items-center space-x-3 p-3 rounded-md cursor-pointer hover:bg-white hover:text-seagreen hover:-translate-y-1 transition-all duration-300">
      <span className="text-xl">{icon}</span>
      <span className="text-lg">{text}</span>
    </Link>
  );
};

export default SidebarItem;
