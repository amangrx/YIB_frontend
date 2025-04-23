import React, { useState } from "react";
import Dropdown from "../Dropdown";
import Input from "../Input";
import FileUploadInput from "../FileUploadInput";
import Button from "../Button";
import { toast } from "react-toastify";

const ReadingAndListeningForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    category: null,
    difficulty: null,
    title: "",
    pdfFile: null,
    audioFile: null,
    answers: Array(40).fill(""),
  });

  const difficultyOptions = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];

  const categoryOptions = [
    { value: "READING", label: "Reading" },
    { value: "LISTENING", label: "Listening" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData((prev) => ({ ...prev, answers: newAnswers }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleDropdownChange = (name, option) => {
    setFormData((prev) => ({ ...prev, [name]: option.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (isLoading) return;
  
    const formDataToSend = new FormData();
  
    // Validate required fields
    if (!formData.category || !formData.title || !formData.pdfFile) {
      toast.error("Please fill all required fields");
      return;
    }
  
    // Validate files are proper File objects
    if (!(formData.pdfFile instanceof File)) {
      toast.error("Invalid PDF file");
      return;
    }
  
    if (formData.category === "LISTENING" && !formData.audioFile) {
      toast.error("Audio file is required for listening questions");
      return;
    }
  
    // Append all data
    formDataToSend.append("category", formData.category);
    formDataToSend.append("difficulty", formData.difficulty || "MEDIUM");
    formDataToSend.append("title", formData.title);
    formDataToSend.append("pdfFile", formData.pdfFile);
    
    if (formData.audioFile) {
      formDataToSend.append("audioFile", formData.audioFile);
    }
  
    // Stringify answers array
    formDataToSend.append("answers", JSON.stringify(formData.answers));
  
    onSubmit(formDataToSend);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Reading/Listening Question Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium py-2" htmlFor="category">
            Question Type <span className="text-red-500">*</span>
          </label>
          <Dropdown
            id="category"
            options={categoryOptions}
            selectedOption={categoryOptions.find(
              (opt) => opt.value === formData.category
            )}
            onSelect={(option) => handleDropdownChange("category", option)}
            placeholder="Select question type"
            className="w-full"
          />
        </div>

        {/* Difficulty Dropdown */}
        <div className="flex flex-col gap-2">
          <label className="text-base font-medium py-2" htmlFor="difficulty">
            Difficulty Level
          </label>
          <Dropdown
            id="difficulty"
            options={difficultyOptions}
            selectedOption={difficultyOptions.find(
              (opt) => opt.value === formData.difficulty
            )}
            onSelect={(option) => handleDropdownChange("difficulty", option)}
            placeholder="Select difficulty"
            className="w-full"
          />
        </div>

        {/* Title Input */}
        <Input
          id="title"
          label="Title *"
          placeholder="Enter the title..."
          type="text"
          value={formData.title}
          onChange={(e) =>
            handleInputChange({
              target: {
                name: "title",
                value: e.target.value,
              },
            })
          }
        />

        {/* PDF File Upload */}
        <FileUploadInput
          id="pdfFile" // Must match the state key
          label="PDF File"
          onChange={handleFileChange}
          accept=".pdf"
          file={formData.pdfFile}
          required
        />

        {/* Audio File Upload (only for Listening) */}
        {formData.category === "LISTENING" && (
          <FileUploadInput
            id="audioFile" // Must match the state key
            label="Audio File"
            onChange={handleFileChange}
            accept="audio/*"
            file={formData.audioFile}
            required={formData.category === "LISTENING"}
          />
        )}

        {/* 40 Answer Inputs */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">
            Answers (1-40)
          </h3>
          <div className="grid grid-cols-5 gap-4">
            {formData.answers.map((answer, index) => (
              <Input
                key={index}
                id={`answer-${index}`}
                label={`Q${index + 1}`}
                placeholder={`Answer ${index + 1}`}
                type="text"
                value={answer}
                onChange={(e) => handleAnswerChange(index, e.target.value)}
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button name={isLoading ? "Submitting..." : "Submit Question"} />
        </div>
      </form>
    </div>
  );
};

export default ReadingAndListeningForm;
