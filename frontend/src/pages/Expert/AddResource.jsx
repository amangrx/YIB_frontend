import React, { useState, useRef } from "react";
import SideBar from "../../components/SideBar";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import Button from "../../components/Button";
import EditorComponent from "../../components/EditorComponent";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const AddResource = () => {
  const [resourceName, setResourceName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [resourceType, setResourceType] = useState(null); 
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [uploadedDate] = useState(new Date().toISOString().split("T")[0]);
  const { token } = useAuth();
  const editorRef = useRef(null);

  const categoryOptions = [
    { value: "grammar-tips", label: "Grammar Tips" },
    { value: "vocabulary", label: "Vocabulary Building" },
    { value: "writing", label: "Writing Skills" },
    { value: "speaking", label: "Speaking Tips" },
    { value: "listening", label: "Listening Tips" },
    { value: "reading", label: "Reading Techniques" },
    { value: "test-strategies", label: "Test Strategies" },
    { value: "time-management", label: "Time Management" },
    { value: "sample-answers", label: "Sample Answers" },
    { value: "common-mistakes", label: "Common Mistakes" },
  ];

  const typeOptions = [ 
    { value: "FREE", label: "Free" },
    { value: "PAID", label: "Paid" },
  ];

  const [resourceError, setResourceError] = useState({
    resourceName: "",
    selectedCategory: "",
    resourceType: "", 
    amount: "", 
    description: "",
  });

  function validateForm() {
    let valid = true;
    const resourceErrorCopy = { ...resourceError };

    if (resourceName.trim()) {
      resourceErrorCopy.resourceName = "";
    } else {
      resourceErrorCopy.resourceName = "Resource name is required";
      valid = false;
    }

    if (selectedCategory) {
      resourceErrorCopy.selectedCategory = "";
    } else {
      resourceErrorCopy.selectedCategory = "Category is required";
      valid = false;
    }

    // Validate resource type
    if (resourceType) {
      resourceErrorCopy.resourceType = "";
      // Validate amount if resource is paid
      if (resourceType.value === "PAID") {
        if (!amount.trim()) {
          resourceErrorCopy.amount = "Amount is required for paid resources";
          valid = false;
        } else if (isNaN(amount) || parseFloat(amount) <= 0) {
          resourceErrorCopy.amount = "Please enter a valid positive number";
          valid = false;
        }
      }
    } else {
      resourceErrorCopy.resourceType = "Type is required";
      valid = false;
    }

    const wordCount = description.trim()
      ? description.trim().split(/\s+/).length
      : 0;

    if (!description.trim()) {
      resourceErrorCopy.description = "Description is required";
      valid = false;
    } else if (wordCount > 100) {
      resourceErrorCopy.description = "Description must be 100 words or less";
      valid = false;
    } else {
      resourceErrorCopy.description = "";
    }

    setResourceError(resourceErrorCopy);
    return valid;
  }

  const handleNameChange = React.useCallback((e) => {
    setResourceName(e.target.value);
  }, []);

  const handleCategorySelect = React.useCallback((option) => {
    setSelectedCategory(option);
  }, []);

  const handleTypeSelect = React.useCallback((option) => { 
    setResourceType(option);
    if (option.value === "FREE") {
      setAmount("");
    }
  }, []);

  const handleAmountChange = React.useCallback((e) => { 
    setAmount(e.target.value);
  }, []);

  const handleDescriptionChange = React.useCallback((e) => {
    setDescription(e.target.value);
  }, []);

  const handleEditorChange = React.useCallback((data) => {
    console.log("Editor content changed:", data);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form fields
    if (!validateForm()) {
      return;
    }

    try {
      // Show loading state
      const toastId = toast.loading("Submitting your resource...");

      // Save editor content
      const content = await editorRef.current?.save();

      const resourceData = {
        title: resourceName,
        category: selectedCategory.value,
        type: resourceType.value, // Add resource type
        price: resourceType.value === "PAID" ? parseFloat(amount) : 0, // Add amount if paid
        description,
        content: JSON.stringify(content), // Convert EditorJS content to string
        createdAt: uploadedDate,
        // author: user?.name || "Anonymous",
        // likes: 0,
        // views: 0,
        // tags: []
      };

      console.log(content);
      const API_URL = "http://localhost:8081/api/yib/expert/resource";
      const response = await axios.post(API_URL, resourceData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      console.log("Resource submitted successfully:", response.data);
      console.log(content)
      // Update toast to show success
      toast.update(toastId, {
        render: "Resource submitted successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

      // Reset form
      setResourceName("");
      setSelectedCategory(null);
      setResourceType(null);
      setAmount("");
      setDescription("");
      editorRef.current?.clear();
    } catch (error) {
      console.error("Submission error:", error);
      toast.dismiss();
      toast.error(error.message || "Error submitting form. Please try again.", {
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="flex">
      <div className="w-64 fixed h-full">
        <SideBar />
      </div>

      <div className="flex-1 ml-64 p-8 bg-gray-50">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add New Resource</h1>
          <p className="text-gray-600 mt-2">
            Share your knowledge with the community by adding a new resource
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            Resource Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Input
                id="resource-name"
                label="Resource Name"
                placeholder="Enter the name of the resource"
                type="text"
                value={resourceName}
                onChange={handleNameChange}
                className={resourceError.resourceName ? "border-red-500" : ""}
              />
              {resourceError.resourceName && (
                <p className="text-red-500 text-sm">
                  {resourceError.resourceName}
                </p>
              )}
            </div>

            <div>
              <label className="text-base font-medium py-2 block mb-2">
                Category
              </label>
              <Dropdown
                options={categoryOptions}
                onSelect={handleCategorySelect}
                placeholder="Select a category"
                selectedOption={selectedCategory}
                className={
                  resourceError.selectedCategory ? "border-red-500" : ""
                }
              />
              {resourceError.selectedCategory && (
                <p className="text-red-500 text-sm">
                  {resourceError.selectedCategory}
                </p>
              )}
            </div>

            {/* New Type Dropdown */}
            <div>
              <label className="text-base font-medium py-2 block mb-2">
                Type
              </label>
              <Dropdown
                options={typeOptions}
                onSelect={handleTypeSelect}
                placeholder="Select resource type"
                selectedOption={resourceType}
                className={resourceError.resourceType ? "border-red-500" : ""}
              />
              {resourceError.resourceType && (
                <p className="text-red-500 text-sm">
                  {resourceError.resourceType}
                </p>
              )}
            </div>

            {resourceType?.value === "PAID" && (
              <div>
                <Input
                  id="resource-amount"
                  label="Amount "
                  placeholder="Enter price amount"
                  type="number"
                  value={amount}
                  onChange={handleAmountChange}
                  className={resourceError.amount ? "border-red-500" : ""}
                  min="0"
                  step="0.01"
                />
                {resourceError.amount && (
                  <p className="text-red-500 text-sm">
                    {resourceError.amount}
                  </p>
                )}
              </div>
            )}

            <div className="md:col-span-2">
              <Input
                id="resource-description"
                label="Description"
                placeholder="Enter a detailed description of the resource"
                type="textarea"
                value={description}
                onChange={handleDescriptionChange}
                className={resourceError.description ? "border-red-500" : ""}
              />
              {resourceError.description && (
                <p className="text-red-500 text-sm">
                  {resourceError.description}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="text-base font-medium py-2 block mb-2">
                Resource Content
              </label>
              <p className="text-sm text-gray-500 mt-2">
                Write the detailed content of your resource here
              </p>
              <div className="border rounded-lg p-4 bg-white">
                <EditorComponent
                  holderId="editorjs-container"
                  onChange={handleEditorChange}
                  ref={editorRef}
                />
              </div>
            </div>

            <input type="hidden" name="uploadedDate" value={uploadedDate} />

            <div className="md:col-span-2 flex justify-end mt-4">
              <Button type="submit" name="Submit Resource" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResource;