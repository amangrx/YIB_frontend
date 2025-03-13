import { Link } from "react-router-dom";
import NavigatePages from "../utils/NavigatePages";
import { logo } from "../utils/UseImages";
import Button from "./Button";

const NavBar = () => {
  const { goToLogin, goToHome } = NavigatePages();

  return (
    <header className="w-full px-10 py-2 flex items-center justify-between">
      <div className="pl-4">
        <img src={logo} alt="Logo" className="w-24 h-24 cursor-pointer" onClick={goToHome}/>
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
      <div className="flex items-center gap-3">
        <div onClick={goToLogin}>
          <Button name="Log in" />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
