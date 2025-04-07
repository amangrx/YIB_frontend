import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Input from "../components/Input";
import Button from "../components/Button";
import { toast } from "react-toastify";
import axios from "axios";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import Footer from "../components/Footer";

const ContactUs = () => {
  const [fullName, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comments, setComments] = useState("");
  const [uploadedDate] = useState(new Date().toISOString().split("T")[0]);

  const [testimonialError, setTestimonialError] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    comments: "",
  });

  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqList = [
    {
      question: "What is IELTS and why should I take it?",
      answer:
        "IELTS is an English language proficiency test used for study, work, and migration. It's accepted by thousands of institutions worldwide.",
    },
    {
      question: "Is the content on this website free?",
      answer:
        "Yes, most practice materials are free. However, advanced features like AI evaluation and full mock tests require a premium account.",
    },
    {
      question: "How do I track my progress on the website?",
      answer:
        "After creating an account, your test scores and activity are saved automatically. You can view your progress and performance trends in your dashboard.",
    },
    {
      question: "How accurate is the AI essay evaluation?",
      answer:
        "Our AI model is trained on real IELTS data and provides scoring based on IELTS band descriptors, but we recommend human review for final prep.",
    },
    {
      question: "How often should I practice for IELTS?",
      answer:
        "Daily practice of 1-2 hours is ideal, with balanced focus on Listening, Reading, Writing, and Speaking modules.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveFAQ(activeFAQ === index ? null : index);
  };

  function validateForm() {
    let valid = true;
    const testimonialErrorCopy = { ...testimonialError };

    // Name
    if (fullName.trim()) {
      testimonialErrorCopy.fullName = "";
    } else {
      testimonialErrorCopy.fullName = "Name is required";
      valid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      testimonialErrorCopy.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      testimonialErrorCopy.email = "Enter a valid email address";
      valid = false;
    } else {
      testimonialErrorCopy.email = "";
    }

    // Phone (exactly 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber.trim()) {
      testimonialErrorCopy.phoneNumber = "Phone is required";
      valid = false;
    } else if (!phoneRegex.test(phoneNumber)) {
      testimonialErrorCopy.phoneNumber =
        "Phone number must be exactly 10 digits";
      valid = false;
    } else {
      testimonialErrorCopy.phoneNumber = "";
    }

    // Comments
    if (comments.trim()) {
      testimonialErrorCopy.comments = "";
    } else {
      testimonialErrorCopy.comments = "Comments are required";
      valid = false;
    }

    setTestimonialError(testimonialErrorCopy);
    return valid;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (validateForm()) {
      const contactData = { fullName, email, phoneNumber, uploadedDate, comments };
      const API_URL = "http://localhost:8081/api/yib/customers/comments";
      console.log(contactData);
      axios
        .post(API_URL, contactData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          toast.success("Contact form submitted successfully!");
          setName("");
          setEmail("");
          setPhoneNumber("");
          setComments("");
        })
        .catch(() => {
          toast.error("Failed to submit contact form");
        });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row gap-8">
        {/* Contact Form */}
        <div className="md:w-2/3 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Leave an inquiry.
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="fullName"
              type="text"
              label="Full Name"
              value={fullName}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className={testimonialError.fullName ? "border-red-500" : ""}
            />
            {testimonialError.fullName && (
              <p className="text-red-500 text-sm">{testimonialError.fullName}</p>
            )}

            <Input
              id="email"
              type="email"
              name="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className={testimonialError.email ? "border-red-500" : ""}
            />
            {testimonialError.email && (
              <p className="text-red-500 text-sm">{testimonialError.email}</p>
            )}

            <Input
              id="phoneNumber"
              type="tel"
              label="Phone Number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className={testimonialError.phoneNumber ? "border-red-500" : ""}
            />
            {testimonialError.phoneNumber && (
              <p className="text-red-500 text-sm">
                {testimonialError.phoneNumber}
              </p>
            )}

            <Input
              id="comments"
              type="textarea"
              label="Your Comments"
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Write your testimonial here"
              className={testimonialError.comments ? "border-red-500" : ""}
            />
            {testimonialError.comments && (
              <p className="text-red-500 text-sm">
                {testimonialError.comments}
              </p>
            )}

            <input type="hidden" value={uploadedDate} />
            <Button name="Submit" />
          </form>
        </div>

        {/* Contact Info Card */}
        <div className="md:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-xl flex flex-col gap-4">
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">
            Get in Touch
          </h3>

          <div className="flex items-start gap-3 text-blue-800">
            <FaEnvelope className="mt-1 text-xl" />
            <p>ransingaman@gmail.com</p>
          </div>

          <div className="flex items-start gap-3 text-blue-800">
            <FaPhoneAlt className="mt-1 text-xl" />
            <p>+977 9814173149</p>
          </div>

          <div className="flex items-start gap-3 text-blue-800">
            <FaMapMarkerAlt className="mt-1 text-xl" />
            <p>Himali Marg-17, Pokhara, Nepal</p>
          </div>

          <div className="mt-4 overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2174.8372508672137!2d83.97330840563944!3d28.195199980014845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1743989262897!5m2!1sen!2snp"
              width="600"
              height="450"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="container mx-auto p-6 mt-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqList.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <button
                className="w-full text-left flex justify-between items-center font-medium text-gray-700 text-lg"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-xl">
                  {activeFAQ === index ? "−" : "+"}
                </span>
              </button>
              {activeFAQ === index && (
                <p className="mt-2 text-gray-600 text-base">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
