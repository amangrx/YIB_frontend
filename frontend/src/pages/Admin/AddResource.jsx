import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import axios from "axios";

const AddResource = () => {
  const [resourceName, setResourceName] = useState("");
  const [category, setCategory] = useState("");
  const [difficultyLevel, setDifficulty] = useState("");
  const [file, setFile] = useState(null);
  const [additionalFile, setAdditionalFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [resourceError, setResourceError] = useState({
    resourceName: "",
    category: "",
    difficultyLevel: "",
    file: "",
  });

  function validateForm() {
    let valid = true;
    const resourceErrorCopy = { ...resourceError };

    resourceErrorCopy.resourceName = resourceName.trim()
      ? ""
      : "**Resource name is required.";
    valid = valid && !!resourceName.trim();

    resourceErrorCopy.category = category ? "" : "**Please select a category";
    valid = valid && !!category;

    resourceErrorCopy.difficultyLevel = difficultyLevel
      ? ""
      : "**Please select a difficulty level";
    valid = valid && !!difficultyLevel;

    resourceErrorCopy.file = file ? "" : "**Please upload a file";
    valid = valid && !!file;

    setResourceError(resourceErrorCopy);
    return valid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const resource = { resourceName, category, difficultyLevel };
    const formData = new FormData();
    formData.append(
      "resource",
      new Blob([JSON.stringify(resource)], { type: "application/json" })
    );
    if (file) formData.append("resourceFile", file);
    if (additionalFile) formData.append("additionalFile", additionalFile);

    try {
      const response = await axios.post(
        "http://localhost:8081/api/yib/resources/add_resource",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Resource added successfully");
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Failed to add resource"
      );
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl p-4">
          <h2 className="text-3xl font-bold mb-6 text-center">Add Resource</h2>
          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 shadow-2xl rounded-lg w-full"
            encType="multipart/form-data"
          >
            <Input
              id="resourceName"
              label="Resource Name:"
              type="text"
              placeholder="Enter resource name"
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              className={`border ${
                resourceError.resourceName
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {resourceError.resourceName && (
              <p className="text-red-500 text-sm mt-1">
                {resourceError.resourceName}
              </p>
            )}

            {/* Category Dropdown */}
            <div>
              <label className="block font-medium pb-2">Category:</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-3 border rounded-md ${
                  resourceError.category ? "border-red-500" : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Writing">Writing</option>
                <option value="Listening">Listening</option>
                <option value="Reading">Reading</option>
                <option value="Speaking">Speaking</option>
              </select>
              {resourceError.category && (
                <p className="text-red-500 text-sm mt-1">
                  {resourceError.category}
                </p>
              )}
            </div>

            {/* Difficulty Level Dropdown */}
            <div>
              <label className="block font-medium pb-2">
                Difficulty Level:
              </label>
              <select
                value={difficultyLevel}
                onChange={(e) => setDifficulty(e.target.value)}
                className={`w-full p-3 border rounded-md ${
                  resourceError.difficultyLevel
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              >
                <option value="" disabled>
                  Select difficulty level
                </option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {resourceError.difficultyLevel && (
                <p className="text-red-500 text-sm mt-1">
                  {resourceError.difficultyLevel}
                </p>
              )}
            </div>

            {/* Upload Resource File */}
            <div>
              <label className="block font-medium pb-2">
                Upload Resource File:
              </label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className={`w-full p-3 border rounded-md ${
                  resourceError.file ? "border-red-500" : "border-gray-300"
                }`}
              />
              {resourceError.file && (
                <p className="text-red-500 text-sm mt-1">
                  {resourceError.file}
                </p>
              )}
            </div>

            {/* Upload Additional Resource File (Optional) */}
            <div>
              <label className="block font-medium pb-2">
                Upload Additional Resource (Optional):
              </label>
              <input
                type="file"
                onChange={(e) => setAdditionalFile(e.target.files[0])}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>

            <Button name="Submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddResource;
