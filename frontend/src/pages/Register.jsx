import axios from "axios";
import React, { useState } from "react";
import { signup_logo, logo } from "../utils/UseImages";
import NavigatePages from "../utils/NavigatePages";
import Input from "../components/Input"; // Importing the Input component
import Button from "../components/Button"; // Importing the Button component

const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { goToLogin, goToHome } = NavigatePages();

  const [registerError, setRegisterError] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });

  function validateForm() {
    let valid = true;
    const registerErrorCopy = { ...registerError };
    if (name.trim()) {
      registerErrorCopy.name = "";
    } else {
      registerErrorCopy.name = "Name is required";
      valid = false;
    }
    if (address.trim()) {
      registerErrorCopy.address = "";
    } else {
      registerErrorCopy.address = "Address is required";
      valid = false;
    }
    if (phone.trim()) {
      registerErrorCopy.phone = "";
    } else {
      registerErrorCopy.phone = "Phone is required";
      valid = false;
    }
    if (email.trim()) {
      registerErrorCopy.email = "";
    } else {
      registerErrorCopy.email = "Email is required";
      valid = false;
    }

    if (password.trim()) {
      registerErrorCopy.password = "";
    } else {
      registerErrorCopy.password = "Password is required";
      valid = false;
    }
    setRegisterError(registerErrorCopy);
    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      const customerData = { address, name, email, phone, password };
      const API_URL = "http://localhost:8081/yib/register";
      axios
        .post(API_URL, customerData, {
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
          alert("Registration failed: " + (error || "Unknown error"));
        });
    }
  }

  return (
    <div className="flex w-full h-screen font-poppins">
      {/* Left Container */}
      <div className="relative w-full sm:w-2/5 bg-seagreen text-[#ebe6e0] p-10 flex flex-col justify-center items-center hover:border-beige border-transparent transition-all">
        <button
          onClick={goToHome}
          className="absolute top-4 left-4 bg-amber-50 text-seagreen text-base px-4 py-2 flex items-center gap-2 rounded-md cursor-pointer font-medium opacity-50 hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Go to Home
        </button>

        <div className="mb-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-center">
            Welcome to Your IELTS Teacher !!!
          </h3>
        </div>

        <div className="w-full mb-6 flex justify-center">
          <img
            src={signup_logo}
            alt=""
            className="max-w-xs sm:max-w-md mx-auto"
          />
        </div>

        <div className="mb-2">
          <p className="text-lg sm:text-xl text-center">
            Already have an account?
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={goToLogin}
            className="bg-amber-50 text-seagreen text-base px-6 py-3 rounded-md cursor-pointer font-medium opacity-100 hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
          >
            LOG IN
          </button>
        </div>
      </div>

      {/* Right Container */}
      <div className="w-full sm:w-3/5 bg-beige text-[#014034] flex flex-col justify-center items-center p-10 sm:p-16 hover:border-seagreen border-transparent transition-all">
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-left">
            Get Started.
          </h3>
        </div>
        <div className="mb-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-left">
            Create your account and take a test.
          </h3>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Name and Address Fields Side by Side */}
          <div className="flex space-x-4">
            <div className="w-full">
              <Input
                id="name"
                label="Name"
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={
                  registerError.name ? "border-red-500" : "border-gray-300"
                }
              />
              {registerError.name && (
                <div className="text-red-500 text-sm mt-1">
                  {registerError.name}
                </div>
              )}
            </div>

            <div className="w-full">
              <Input
                id="address"
                label="Address"
                placeholder="Enter your address"
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className={
                  registerError.address ? "border-red-500" : "border-gray-300"
                }
              />
              {registerError.address && (
                <div className="text-red-500 text-sm mt-1">
                  {registerError.address}
                </div>
              )}
            </div>
          </div>

          {/* Phone Field */}
          <Input
            id="phone"
            label="Phone"
            placeholder="Enter your phone number"
            type="text"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            className={
              registerError.phone ? "border-red-500" : "border-gray-300"
            }
          />
          {registerError.phone && (
            <div className="text-red-500 text-sm mt-1">
              {registerError.phone}
            </div>
          )}

          {/* Email Field */}
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={
              registerError.email ? "border-red-500" : "border-gray-300"
            }
          />
          {registerError.email && (
            <div className="text-red-500 text-sm mt-1">
              {registerError.email}
            </div>
          )}

          {/* Password Field */}
          <Input
            id="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={
              registerError.password ? "border-red-500" : "border-gray-300"
            }
          />
          {registerError.password && (
            <div className="text-red-500 text-sm mt-1">
              {registerError.password}
            </div>
          )}

          <div className="mt-4 flex justify-center">
            <Button name="SIGN UP" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
