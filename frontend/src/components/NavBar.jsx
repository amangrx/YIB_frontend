import { Link } from "react-router-dom";
import NavigatePages from "../utils/NavigatePages";
import { logo } from "../utils/UseImages";
import Button from "./Button";
import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const { goToLogin, goToHome, goToCustomerDashboard } = NavigatePages();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/library?search=${encodeURIComponent(searchQuery)}`);
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

      <div className="flex items-center gap-4">
        <form onSubmit={handleSearch}>
          <SearchBar
            className="w-64 md:w-80"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        {isLoggedIn ? (
          <button
            onClick={goToCustomerDashboard}
            className="w-10 h-10 bg-seagreen text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-darkseagreen transition-all"
          >
            <FaUser className="text-xl" />
          </button>
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
