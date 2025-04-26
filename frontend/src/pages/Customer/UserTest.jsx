import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";
import Timer from "../../components/Timer";
import { toast } from "react-toastify";
import NavigatePages from "../../utils/NavigatePages";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const UserTest = () => {
  const { questionId } = useParams();
  const { token } = useAuth();
  const { goToTakeTest } = NavigatePages();
  const [test, setTest] = useState(null);
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const startTest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/yib/auth/detail/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("suru ma ", response);
        
        // Transform the flat API response to the nested structure expected by the component
        const transformedData = {
          id: response.data.id,
          writingQuestion: {
            id: response.data.id,
            question: response.data.question,
            taskType: response.data.writingTaskType?.replace('TASK_', '') || 1,
            imageUrl: response.data.imageUrl,
            category: response.data.category,
            difficulty: response.data.difficulty,
            createdBy: response.data.createdBy,
            createdAt: response.data.createdAt
          }
        };
        
        setTest(transformedData);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching test:", err);
        setError(err.response?.data?.message || "Failed to start the test");
        setIsLoading(false);
      }
    };
    
    if (token) {
      startTest();
    } else {
      setError("Authentication token is missing. Please log in again.");
      setIsLoading(false);
    }
  }, [questionId, token]);

  useEffect(() => {
    const count = answer.trim() ? answer.trim().split(/\s+/).length : 0;
    setWordCount(count);
  }, [answer]);

  const handleSubmit = async () => {
    if (!questionId) {
      toast.error("Question ID is missing");
      return;
    }
  
    setIsSubmitting(true);
    try {
      await axios.post(
        `http://localhost:8081/api/yib/auth/submit`,
        {
          questionId,  
          answer,
          duration: Math.max(1, Math.floor(timeSpent / 60)), 
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Test submitted successfully!");
      goToTakeTest();
    } catch (err) {
      console.error("Submission error:", err);
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
        <div className="w-16 h-16 border-4 border-t-teal-600 border-gray-200 rounded-full animate-spin mb-6"></div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Preparing Your Test</h2>
        <p className="text-lg text-gray-600 max-w-md">
          Loading your writing test materials, please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Error Occurred</h3>
          <p className="mt-2 text-gray-600">{error}</p>
          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="max-w-xl mx-auto mt-12 p-8 bg-white rounded-xl shadow-md text-center">
        <h3 className="text-xl font-semibold text-gray-900">No Test Data Available</h3>
        <p className="mt-2 text-gray-600">Unable to load test information. Please try again later.</p>
        <div className="mt-6">
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Refresh
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-8 font-sans">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-800 px-6 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">IELTS Writing Test</h2>
                <p className="text-teal-100 text-sm mt-1">
                  Task: Academic Writing Task {test.writingQuestion.taskType}
                </p>
              </div>
              <div className="flex items-center gap-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                <Timer onTimeUpdate={setTimeSpent} className="text-white font-medium" />
                <div className="flex items-center gap-2 text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-semibold">{wordCount} words</span>
                </div>
              </div>
            </div>
          </div>

          {/* Writing Prompt */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-teal-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-600" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Writing Prompt</h3>
            </div>
            <div className="bg-teal-50 p-5 rounded-lg border border-teal-100">
              <p className="text-gray-700 leading-relaxed">{test.writingQuestion.question}</p>
              {test.writingQuestion.imageUrl && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={test.writingQuestion.imageUrl}
                    alt="Writing prompt"
                    className="rounded-lg border border-gray-200 max-w-full max-h-72 object-contain shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Answer */}
          <div className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">Your Response</h3>
            </div>
            <div className="relative">
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Write your essay response here (minimum 250 words)..."
                className="w-full min-h-[300px] p-4 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all resize-none shadow-sm"
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {wordCount} words
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 rounded-b-xl">
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <button
                onClick={goToTakeTest}
                className="px-6 py-3 rounded-lg bg-white text-gray-700 font-medium border border-gray-300 hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel Test
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || answer.trim().length === 0}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isSubmitting || answer.trim().length === 0
                    ? "bg-gray-400 cursor-not-allowed focus:ring-gray-400"
                    : "bg-teal-600 hover:bg-teal-700 focus:ring-teal-500"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Answer"}
              </button>
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-teal-50 rounded-xl p-6 border border-teal-100">
          <h3 className="text-lg font-semibold text-teal-800 mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            Writing Test Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="text-teal-500">•</span><span>Aim for at least 250 words</span></li>
            <li className="flex items-start gap-2"><span className="text-teal-500">•</span><span>Use clear paragraphing</span></li>
            <li className="flex items-start gap-2"><span className="text-teal-500">•</span><span>Maintain formal academic tone</span></li>
            <li className="flex items-start gap-2"><span className="text-teal-500">•</span><span>Check grammar and spelling</span></li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserTest;