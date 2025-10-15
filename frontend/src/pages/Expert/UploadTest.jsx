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
        reading_listening:
          "http://localhost:8081/api/yib/expert/reading-listening",
        speaking: "http://localhost:8081/api/yib/expert/speaking",
      };

      if (!token) {
        throw new Error("Authentication token missing");
      }

      const response = await fetch(endpointMap[selectedTest], {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
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

  const renderSelectedTest = () => {
    const test = testTypes.find((t) => t.id === selectedTest);
    return test ? React.cloneElement(test.component, { isLoading }) : null;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar className="w-64 fixed h-full bg-gray-800 text-white" />

      <div className="flex-1 ml-64 p-8">
        <div className="mb-10">
          <div className="flex items-center gap-4 ml-1">
            <label className="text-lg font-medium text-gray-700">
              Select the test you want to upload:
            </label>
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
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          {selectedTest ? (
            renderSelectedTest()
          ) : (
            <div className="text-center py-12 px-4">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">
                  Upload Your Test Content
                </h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-medium text-blue-800 mb-4">
                    📝 Before You Upload
                  </h4>
                  <ul className="text-gray-600 space-y-3 text-left">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Ensure all test content is accurate and properly
                        formatted
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Include clear instructions for each section of the test
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Verify audio files are clear and at appropriate volume
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Double-check answer keys and scoring criteria</span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-blue-600 text-3xl mb-3">✍️</div>
                    <h4 className="font-medium mb-2">Writing Test</h4>
                    <p className="text-sm text-gray-500">
                      Upload writing prompts, sample answers, and scoring
                      criteria
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-green-600 text-3xl mb-3">📖</div>
                    <h4 className="font-medium mb-2">Reading & Listening</h4>
                    <p className="text-sm text-gray-500">
                      Upload passages, questions, audio files, and answer keys
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-purple-600 text-3xl mb-3">🎤</div>
                    <h4 className="font-medium mb-2">Speaking Test</h4>
                    <p className="text-sm text-gray-500">
                      Upload speaking prompts, sample responses, and evaluation
                      criteria
                    </p>
                  </div>
                </div>

                <p className="mt-10 text-gray-500 italic">
                  Select a test type from the dropdown above to begin uploading
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadTest;
