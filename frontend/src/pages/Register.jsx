import axios from "axios";
import React, { useState } from "react";
import { signup_logo } from "../utils/UseImages";
import NavigatePages from "../utils/NavigatePages";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";
import { FaHome } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);

  const { goToLogin, goToHome } = NavigatePages();

  const [registerError, setRegisterError] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    email: "",
    password: "",
    profilePicture: "",
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

    if (!phoneNumber.trim()) {
      registerErrorCopy.phoneNumber = "Your phone number cannot be empty.";
      valid = false;
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      registerErrorCopy.phoneNumber = "Phone number must be exactly 10 digits.";
      valid = false;
    } else {
      registerErrorCopy.phoneNumber = "";
    }

    if (!email.trim()) {
      registerErrorCopy.email = "Email is required.";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      registerErrorCopy.email = "Enter a valid email.";
      valid = false;
    } else {
      registerErrorCopy.email = "";
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/;
    if (!password.trim()) {
      registerErrorCopy.password = "Password is required.";
      valid = false;
    } else if (!passwordRegex.test(password)) {
      registerErrorCopy.password =
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be 6-12 characters long.";
      valid = false;
    } else {
      registerErrorCopy.password = "";
    }

    if (profilePicture) {
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      const maxSizeInBytes = 5 * 1024 * 1024;

      if (!allowedTypes.includes(profilePicture.type)) {
        registerErrorCopy.profilePicture =
          "Only JPG, JPEG, or PNG files are allowed.";
        valid = false;
      } else if (profilePicture.size > maxSizeInBytes) {
        registerErrorCopy.profilePicture = "Image must be less than 5MB.";
        valid = false;
      } else {
        registerErrorCopy.profilePicture = "";
      }
    } else {
      registerErrorCopy.profilePicture = "Profile picture is required.";
      valid = false;
    }

    setRegisterError(registerErrorCopy);
    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      const formData = new FormData();

      // Convert customer data to a Blob with correct JSON content type
      const customerData = { name, address, email, phoneNumber, password };
      formData.append(
        "customerDTO",
        new Blob([JSON.stringify(customerData)], { type: "application/json" })
      );

      // Attach profile image if provided
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const API_URL = "http://localhost:8081/api/yib/customers/register";

      axios
        .post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          toast.success(
            "Registration successful! Login to access your account."
          );
          goToLogin();
        })
        .catch(() => {
          toast.error("Registration failed: ");
        });
    }
  }

  return (
    <div className="flex w-full h-screen font-poppins">
      {/* Left Container */}
      <div className="relative w-full sm:w-2/5 bg-seagreen text-[#ebe6e0] p-10 flex flex-col justify-center items-center">
        <button
          onClick={goToHome}
          className="absolute top-4 left-4 bg-amber-50 text-seagreen text-base px-4 py-2 flex items-center gap-2 rounded-md cursor-pointer font-medium opacity-50 hover:opacity-80 transition-all"
        >
          <FaHome size={24} className="text-seagreen" />{" "}
        </button>

        <div className="mb-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-center">
            Welcome to Your IELTS Teacher!
          </h3>
        </div>

        <div className="w-full mb-6 flex justify-center">
          <img
            src={signup_logo}
            alt="Signup"
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
            className="bg-amber-50 text-seagreen text-base px-6 py-3 rounded-md cursor-pointer font-medium opacity-100 hover:opacity-80 transition-all"
          >
            LOG IN
          </button>
        </div>
      </div>

      {/* Right Container */}
      <div className="w-full sm:w-3/5 bg-beige text-[#014034] flex flex-col justify-center items-center p-10 sm:p-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-6">
          Create Your Account
        </h3>

        <form
          className="w-full"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          {/* Name and Address Fields Side by Side */}
          <div className="flex space-x-4">
            <div className="w-full">
              <Input
                id="name"
                label="Name"
                placeholder="Enter your name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                onChange={(e) => setAddress(e.target.value)}
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
            id="phoneNumber"
            label="Phone"
            placeholder="Enter your phone number"
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={
              registerError.phoneNumber ? "border-red-500" : "border-gray-300"
            }
          />
          {registerError.phoneNumber && (
            <div className="text-red-500 text-sm mt-1">
              {registerError.phoneNumber}
            </div>
          )}

          {/* Email Field */}
          <Input
            id="email"
            label="Email"
            placeholder="Enter your email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
            className={
              registerError.password ? "border-red-500" : "border-gray-300"
            }
          />
          {registerError.password && (
            <div className="text-red-500 text-sm mt-1">
              {registerError.password}
            </div>
          )}

          {/* Profile Picture Upload */}
          <div className="mt-4">
            <label className="text-base font-medium py-2">
              Upload Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePicture(e.target.files[0])}
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
            {registerError.profilePicture && (
              <div className="text-red-500 text-sm mt-1">
                {registerError.profilePicture}
              </div>
            )}
          </div>

          {/* Submit Button */}

          <div className="mt-4 flex justify-center">
            <Button name="SIGN UP" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;