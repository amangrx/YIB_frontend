import React, { useState } from "react";
import Dropdown from "../Dropdown";

const WritingForm = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    difficulty: null,
    writingTaskType: null,  // Changed from taskType to match backend
    question: "",
    answer: "",
    imageFile: null,       // Changed from image to match backend
  });

  // Debugging: Log state changes
  React.useEffect(() => {
    console.log("Form data updated:", formData);
  }, [formData]);

  const difficultyOptions = [
    { value: "EASY", label: "Easy" },
    { value: "MEDIUM", label: "Medium" },
    { value: "HARD", label: "Hard" },
  ];

  const taskTypeOptions = [
    { value: "TASK_1", label: "Task 1" },
    { value: "TASK_2", label: "Task 2" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, imageFile: e.target.files[0] }));
    }
  };

  const handleDropdownChange = (name, option) => {
    setFormData((prev) => ({ ...prev, [name]: option.value })); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    
    if (formData.difficulty) formDataToSend.append('difficulty', formData.difficulty);
    if (formData.writingTaskType) formDataToSend.append('writingTaskType', formData.writingTaskType);
    if (formData.question) formDataToSend.append('question', formData.question);
    if (formData.answer) formDataToSend.append('answer', formData.answer);
    
    if (formData.imageFile) {
      formDataToSend.append('imageFile', formData.imageFile);
    }
  
    // Debug: Log all form data entries
    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}:`, value);
    }
  
    onSubmit(formDataToSend);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Writing Task Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Difficulty Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Difficulty Level
          </label>
          <Dropdown
            options={difficultyOptions}
            selectedOption={difficultyOptions.find(opt => opt.value === formData.difficulty)}
            onSelect={(option) => handleDropdownChange('difficulty', option)}
            placeholder="Select difficulty"
            className="w-full"
          />
        </div>

        {/* Task Type Dropdown */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Writing Task Type
          </label>
          <Dropdown
            options={taskTypeOptions}
            selectedOption={taskTypeOptions.find(opt => opt.value === formData.writingTaskType)}
            onSelect={(option) => handleDropdownChange('writingTaskType', option)}
            placeholder="Select task type"
            className="w-full"
          />
        </div>

        {/* Question Input */}
        <div className="space-y-2">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            id="question"
            name="question"
            type="text"
            value={formData.question}
            onChange={handleInputChange}
            placeholder="Enter your question here..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Answer Textarea */}
        <div className="space-y-2">
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            placeholder="Write your detailed answer here..."
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={6}
          />
        </div>

        {/* Image Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Upload Supporting Image (Optional)
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-seagreen hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200">
              <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
                <svg
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500">
                  {formData.imageFile ? formData.imageFile.name : "PNG, JPG, GIF (MAX. 5MB)"}
                </p>
              </div>
              <input
                id="image-upload"
                type="file"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Submitting..." : "Submit Writing Task"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default WritingForm;