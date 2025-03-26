import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import Button from "../components/Button";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    comments: "",
    uploadedDate: new Date().toISOString().split("T")[0], // Auto-set date
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://api.example.com/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Form submitted successfully!");
        setFormData({
          fullName: "",
          email: "",
          uploadedDate: "",
          comments: "",
        });
      } else {
        alert("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="fullName"
            type="text"
            name="fullName"
            label="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full"
            required
          />
          <Input
            id="email"
            type="email"
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full"
            required
          />
          <Input
            id="phoneNumber"
            type="tel"
            name="phoneNumber"
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
            className="w-full"
          />
          <Input
            id="comments"
            type="textarea"
            name="comments"
            label="Your Comments"
            value={formData.comments}
            onChange={handleChange}
            placeholder="Write your testimonial here"
            className="w-full"
            required
          />
          <input type="hidden" name="uploadedDate" value={formData.uploadedDate} />
          <Button name="Submit" />
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
