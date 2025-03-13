import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { FaPaperclip } from "react-icons/fa"; // Importing the paperclip icon from react-icons
import axios from "axios";

const AddResource = () => {
  const [resourceName, setResourceName] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [additionalFile, setAdditionalFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Create the resource object
    const resource = {
      resourceName: resourceName,
      category: category,
    };

    const formData = new FormData();

    // Append the resource object as a JSON string (we can convert it to a Blob)
    formData.append(
      "resource",
      new Blob([JSON.stringify(resource)], { type: "application/json" })
    );

    // Append the resource file
    if (file) {
      formData.append("resourceFile", file);
    }

    // Append the additional resource file (if provided)
    if (additionalFile) {
      formData.append("additionalResourceFile", additionalFile);
    }

    axios
      .post("http://localhost:8081/api/yib/resources/add_resource", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
        maxBodyLength: 50 * 1024 * 1024, // 50MB Limit
        maxContentLength: 50 * 1024 * 1024,
      })
      .then((response) => {
        console.log("Resource added successfully:", response.data);
        alert("Resource added successfully");
      })
      .catch((error) => {
        console.error("Error adding resource:", error);
        alert(
          "Error adding resource: " +
            (error.response ? error.response.data : error.message)
        );
      });

    // Send the request to the backend
    // axios
    //   .post("http://localhost:8081/api/yib/resources/add_resource", formData, {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   })
    //   .then((response) => {
    //     console.log("Resource added successfully:", response.data);
    //     alert("Resource added successfully");
    //   })
    //   .catch((error) => {
    //     console.error(
    //       "Error adding resource:",
    //       error.response ? error.response.data : error.message
    //     );
    //     alert("Error adding resource");
    //   });
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <div className="flex-grow flex items-center justify-center">
          <div className="w-full max-w-3xl p-4">
            <h2 className="text-3xl font-bold mb-6 text-center">
              Add Resource
            </h2>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-white p-8 shadow-2xl rounded-lg w-full"
            >
              <Input
                id="resourceName"
                label="Resource Name:"
                type="text"
                placeholder="Enter resource name"
                value={resourceName}
                onChange={(e) => setResourceName(e.target.value)}
                className="w-full"
                required
              />
              <div>
                <label className="block font-medium pb-3">Category:</label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-seagreen"
                  required
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="Writing">Writing</option>
                  <option value="Listening">Listening</option>
                  <option value="Reading">Reading</option>
                  <option value="Speaking">Speaking</option>
                </select>
              </div>
              <div>
                <label className="block font-medium pb-3">
                  Upload Resource File:
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="w-full border border-gray-300 p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-seagreen"
                    required
                  />
                  <FaPaperclip className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>
              <div>
                <label className="block font-medium pb-3">
                  Upload Additional Resource (Optional):
                </label>
                <div className="relative">
                  <input
                    type="file"
                    onChange={(e) => setAdditionalFile(e.target.files[0])}
                    className="w-full border border-gray-300 p-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-seagreen"
                  />
                  <FaPaperclip className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                </div>
              </div>
              <Button name="Submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResource;
