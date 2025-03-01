import { Link } from "react-router-dom";
import NavigatePages from "../utils/NavigatePages";
import { logo } from "../utils/UseImages";
import "./components-css/NavBar.css";

const NavBar = () => {
  const { goToLogin } = NavigatePages();

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img
            src={logo}
            alt={logo}
            style={{ width: "100px", height: "100px" }}
          />
        </div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/">IELTS GUIDE</Link>
          </li>
          <li>
            <Link to="/">IELTS GUIDE</Link>
          </li>
          <li>
            <Link to="/">Preparation</Link>
          </li>
          <li>
            <Link to="/">Test Taking</Link>
          </li>
        </ul>

        <form>
          <input type="search" placeholder="Search content ..." />
          <i className="fa fa-search"></i>
        </form>

        <div className="nav-button">
          <button className="button Log-in" onClick={goToLogin}>
            <i className="ri-user-fill"></i>Log in
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
