import { Link } from "react-router-dom";
import NavigatePages from "../utils/NavigatePages";
import { logo } from "../utils/UseImages";
import Button from "./Button";
import { getCookie } from "../utils/GetCookie";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";

const NavBar = () => {
  const { goToLogin, goToHome } = NavigatePages();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Check authentication status when component mounts
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("http://localhost:8081/api/yib/auth/check", {
        withCredentials: true // This ensures cookies are sent with the request
      });
      
      setIsAuthenticated(response.data.authenticated);
      if (response.data.authenticated) {
        setUserEmail(response.data.email);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="w-full px-10 py-2 flex items-center justify-between">
      <div className="pl-4">
        <img
          src={logo}
          alt="Logo"
          className="w-24 h-24 cursor-pointer"
          onClick={goToHome}
        />
      </div>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-10">
        {[
          { name: "Home", path: "/" },
          { name: "Take test", path: "/take_test" },
          { name: "Library", path: "/library" },
          { name: "Practice", path: "/practice" },
          { name: "Contact Us", path: "/contact" },
        ].map((item, index) => (
          <li key={index} className="relative group">
            <Link to={item.path} className="text-seagreen font-bold text-lg">
              {item.name}
            </Link>
            <span className="absolute left-0 bottom-[-8px] w-0 h-[3px] bg-seagreen transition-all duration-300 group-hover:w-full"></span>
          </li>
        ))}
      </ul>

      {/* Search Form */}
      {/* <form className="relative w-12 h-12 bg-white border-4 border-white rounded-full flex items-center transition-all duration-1000 hover:w-72 cursor-pointer">
        <input
          type="search"
          placeholder="Search content..."
          className="absolute w-full h-full hidden px-5 text-base outline-none rounded-full group-hover:block"
        />
        <i className="fa fa-search text-seagreen text-lg absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-1000 group-hover:bg-seagreen group-hover:text-white p-2 rounded-full"></i>
      </form> */}

      {/* Login Button using Reusable Button Component */}
      <div className="flex items-center gap-3 relative">
        {isLoading ? (
          <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
        ) : isAuthenticated ? (
          <div className="relative group">
            <Link to="/dashboard" className="text-seagreen text-3xl">
              <FaUserCircle className="cursor-pointer hover:text-darkgreen" />
            </Link>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 invisible group-hover:visible">
              <div className="px-4 py-2 text-sm text-gray-700 border-b">
                Signed in as <br />
                <span className="font-medium">{userEmail}</span>
              </div>
              <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Dashboard
              </Link>
              <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div onClick={goToLogin}>
            <Button name="Log in" />
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;
