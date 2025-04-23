import React, { useState } from "react";
import Sidebar from "../../components/SideBar";
import WritingForm from "../../components/ExpertTestUpload/WritingForm";
import ReadingAndListeningForm from "../../components/ExpertTestUpload/ReadingAndListeningForm";
import SpeakingForm from "../../components/ExpertTestUpload/SpeakingForm";
import Dropdown from "../../components/Dropdown";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../Context/AuthContext";

const UploadTest = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const testTypes = [
    {
      id: "writing",
      label: "Writing Test",
      component: <WritingForm onSubmit={handleSubmit} />,
    },
    {
      id: "reading_listening",
      label: "Reading and Listening Test",
      component: <ReadingAndListeningForm onSubmit={handleSubmit} />,
    },
    {
      id: "speaking",
      label: "Speaking Test",
      component: <SpeakingForm onSubmit={handleSubmit} />,
    },
  ];

  async function handleSubmit(formData) {
    if (!selectedTest) {
      toast.error("Please select a test type first");
      return;
    }

    setIsLoading(true);

    try {
      const endpointMap = {
        writing: "http://localhost:8081/api/yib/expert/writing",
        reading_listening : "http://localhost:8081/api/yib/expert/reading-listening",
        speaking: "http://localhost:8081/api/yib/expert/speaking",
      };

      if (!token) {
        throw new Error("Authentication token missing");
      }

      const response = await fetch(endpointMap[selectedTest], {
        method: "POST",
      
        headers: {
          "Authorization": `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();
      toast.success("Test submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      toast.error(error.message || "Failed to submit test. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar className="w-64 fixed h-full bg-gray-800 text-white" />

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <Dropdown
            options={testTypes.map((test) => ({
              value: test.id,
              label: test.label,
            }))}
            onSelect={(option) => setSelectedTest(option.value)}
            placeholder="Select Test Type"
            className="w-64"
          />
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          {selectedTest ? (
            React.cloneElement(
              testTypes.find((t) => t.id === selectedTest).component,
              {
                isLoading,
              }
            )
          ) : (
            <div className="text-center text-gray-500 py-12">
              Please select a test type from the dropdown
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadTest;
