import { useState } from "react";
import NavigatePages from "../utils/NavigatePages";
import axios from "axios";
import { login_logo, logo } from "../utils/UseImages";
import Input from "../components/Input";
import Button from "../components/Button";
import { FaGithub } from "react-icons/fa"; // GitHub Icon
import { FcGoogle } from "react-icons/fc"; // Google Icon

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { goToSignUp, goToHome } = NavigatePages();

  const [loginError, setLoginError] = useState({
    email: "",
    password: "",
  });

  function validateForm() {
    let valid = true;
    const loginErrorCopy = { ...loginError };

    if (email.trim()) {
      loginErrorCopy.email = "";
    } else {
      loginErrorCopy.email = "**Email is required.";
      valid = false;
    }

    if (password.trim()) {
      loginErrorCopy.password = "";
    } else {
      loginErrorCopy.password = "**Password is required.";
      valid = false;
    }

    setLoginError(loginErrorCopy);
    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      const loginData = { email, password };
      const API_URL = "http://localhost:8081/yib/login";
      axios
        .post(API_URL, loginData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          alert(response.data.message);
          goToHome();
        })
        .catch((error) => {
          console.log(error);
          alert("Login failed: " + (error || "Unknown error"));
        });
    }
  }

  return (
    <div className="flex h-screen flex-col lg:flex-row">
      {/* Left Container (Login) */}
      <div className="w-full lg:w-2/5 bg-beige p-10 flex flex-col justify-center border-b-2 lg:border-r-2 border-seagreen relative">
        {/* Logo at the top-left */}
        <div className="absolute top-0 left-0 p-4">
          <img
            src={logo}
            alt="Logo"
            className="w-24 h-24 cursor-pointer"
            onClick={goToHome}
          />
        </div>

        <h3 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          Log in to your account
        </h3>

        <form onSubmit={handleSubmit} className="mr-10">
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={loginError.email ? "border-red-500" : "border-gray-300"}
          />
          {loginError.email && (
            <p className="text-red-500 text-sm mt-1">{loginError.email}</p>
          )}

          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={
              loginError.password ? "border-red-500" : "border-gray-300"
            }
          />
          {loginError.password && (
            <p className="text-red-500 text-sm mt-1">{loginError.password}</p>
          )}

          <div className="flex justify-center mt-6">
            <Button name="LOGIN" />
          </div>
        </form>

        {/* OR Section */}
        <div className="flex items-center justify-center mt-10 mb-7">
          <span className="mx-1 font-medium text-2xl">Log in using: </span>
        </div>

        {/* GitHub and Google Login Buttons */}
        <div className="flex gap-4 justify-center mt-4">
          {/* GitHub Button */}
          <button className="bg-gray-800 text-white py-2 px-6 rounded-full hover:bg-gray-900 opacity-100 hover:opacity-80 hover:-translate-y-1 transition-all duration-300 flex items-center gap-2">
            <FaGithub className="text-lg" />
            Login with GitHub
          </button>

          {/* Google Button */}
          <button className="bg-seagreen text-white py-2 px-6 rounded-full flex items-center gap-2 opacity-100 hover:opacity-80 hover:-translate-y-1 transition-all duration-300">
            <FcGoogle className="text-lg" />
            Login with Google
          </button>
        </div>
      </div>

      {/* Right Container (Signup) */}
      <div className="w-full lg:w-3/5 bg-seagreen text-beige flex flex-col justify-center items-center p-16">
        <h3 className="text-3xl font-bold text-white mb-4">
          Don't have an account?
        </h3>
        <p className="text-lg text-white mb-8">
          Register here to access the features
        </p>

        {/* Signup Image */}
        <div className="w-80 h-48">
          <img src={login_logo} alt="Login" className="w-full h-full" />
        </div>

        {/* Signup Button */}
        <div className="mt-8">
          <button
            onClick={goToSignUp}
            className="bg-amber-50 text-base px-6 py-3 rounded-md cursor-pointer font-medium opacity-100 hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
