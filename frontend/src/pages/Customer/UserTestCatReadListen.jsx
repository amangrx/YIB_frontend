import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { useParams } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import {
  FiBook,
  FiClock,
  FiUser,
  FiBarChart2,
  FiFileText,
  FiHeadphones,
  FiDownload,
} from "react-icons/fi";
import Button from "../../components/Button";
import Timer from "../../components/Timer";
import NavigatePages from "../../utils/NavigatePages";

const UserTestCatReadListen = () => {
  const { questionId } = useParams();
  const [questionDetail, setQuestionDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isLoggedIn, logout } = useAuth();
  const API_BASE_URL = "http://localhost:8081";
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { goToTakeTest } = NavigatePages();
  const [timerKey, setTimerKey] = useState(Date.now());

  // State for blob URLs
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);

  // State for form data
  const [formData, setFormData] = useState({
    answers: Array(40).fill(""),
  });

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("Please log in to view questions");
      return;
    }

    const fetchQuestionDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/yib/auth/reading-listening-answer/${questionId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 401) {
          logout();
          toast.error("Session expired. Please log in again.");
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuestionDetail(data);

        // Fetch PDF as blob if exists
        if (data.pdfFileUrl) {
          const pdfResponse = await fetch(`${API_BASE_URL}${data.pdfFileUrl}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const pdfBlob = await pdfResponse.blob();
          setPdfBlobUrl(URL.createObjectURL(pdfBlob));
        }

        // Fetch Audio as blob if exists
        if (data.audioFileUrl) {
          const audioResponse = await fetch(
            `${API_BASE_URL}${data.audioFileUrl}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const audioBlob = await audioResponse.blob();
          setAudioBlobUrl(URL.createObjectURL(audioBlob));
        }
      } catch (error) {
        toast.error("Failed to load question details");
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestionDetails();

    // Clean up blob URLs when component unmounts
    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
      if (audioBlobUrl) URL.revokeObjectURL(audioBlobUrl);
    };
  }, [questionId, isLoggedIn, token, logout]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...formData.answers];
    newAnswers[index] = value;
    setFormData({
      ...formData,
      answers: newAnswers,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/yib/auth/reading-listening/submit`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            questionId: questionId,
            answer: formData.answers,
            duration: Math.max(1, Math.ceil(elapsedTime / 60)), // Convert to minutes and round up
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      const data = await response.json();
      toast.success("Answers submitted successfully!");
      goToTakeTest();

      // Reset form and timer after successful submission
      setFormData({ answers: Array(40).fill("") });
      setTimerKey(Date.now()); // This will force the Timer component to reset
      setElapsedTime(0);

      console.log("Submission response:", data);
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Failed to submit answers. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (!isLoggedIn) return null;

  if (isLoading) {
    return (
      <div>
        <NavBar />
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (!questionDetail) {
    return (
      <div>
        <NavBar />
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No question details found</p>
        </div>
      </div>
    );
  }

  const hasListeningAudio = questionDetail.audioFileUrl;
  const hasPdf = questionDetail.pdfFileUrl;

  return (
    <div>
      <NavBar />

      <div className="p-6 max-w-6xl mx-auto">
        {/* Header with Timer */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {questionDetail.title}
          </h2>
          <div className="flex justify-center items-center gap-4">
            <p className="text-gray-600">
              {hasListeningAudio ? "Listening Practice" : "Reading Practice"}
            </p>
            <div className="bg-white px-4 py-2 rounded-lg shadow-sm border flex items-center gap-2">
              <Timer key={timerKey} onTimeUpdate={setElapsedTime} />
              <span className="text-sm text-gray-600">
                ({Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s)
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Meta Information */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">
                Question Information
              </h3>

              <div className="space-y-4">
                <MetaItem
                  icon={<FiFileText className="text-blue-500" />}
                  label="Category"
                  value={questionDetail.category}
                />
                <MetaItem
                  icon={<FiBarChart2 className="text-blue-500" />}
                  label="Difficulty"
                  value={questionDetail.difficulty}
                />
                <MetaItem
                  icon={
                    hasListeningAudio ? (
                      <FiHeadphones className="text-blue-500" />
                    ) : (
                      <FiBook className="text-blue-500" />
                    )
                  }
                  label="Type"
                  value={hasListeningAudio ? "Listening" : "Reading"}
                />
                <MetaItem
                  icon={<FiUser className="text-blue-500" />}
                  label="Created By"
                  value={questionDetail.createdBy}
                />

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiClock className="text-blue-500" />
                    <span>Created: {formatDate(questionDetail.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Main Content */}
          <div className="lg:w-3/4 space-y-6">
            {/* PDF Section */}
            {hasPdf && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <FiFileText className="text-blue-500" />
                    </div>
                    <h3 className="font-bold text-xl text-gray-800">
                      Reading Material
                    </h3>
                  </div>
                  <a
                    href={
                      pdfBlobUrl ||
                      `${API_BASE_URL}${questionDetail.pdfFileUrl}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    download={`${questionDetail.title}.pdf`}
                  >
                    <FiDownload className="mr-1" /> Download PDF
                  </a>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  {pdfBlobUrl ? (
                    <iframe
                      src={`${pdfBlobUrl}#view=fitH`}
                      className="w-full h-96"
                      title="PDF Viewer"
                    >
                      <p className="text-center py-10">
                        Your browser doesn't support PDFs.{" "}
                        <a href={pdfBlobUrl} className="text-blue-600" download>
                          Download the PDF
                        </a>{" "}
                        instead.
                      </p>
                    </iframe>
                  ) : (
                    <div className="flex justify-center items-center h-96">
                      <p>Loading PDF...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Audio Section */}
            {hasListeningAudio && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <FiHeadphones className="text-purple-500" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">
                    Listening Audio
                  </h3>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  {audioBlobUrl ? (
                    <>
                      <audio
                        controls
                        className="w-full"
                        onError={(e) =>
                          console.error("Audio playback error:", e)
                        }
                      >
                        <source src={audioBlobUrl} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                      <div className="mt-3 flex justify-end">
                        <a
                          href={audioBlobUrl}
                          download={`${questionDetail.title}.mp3`}
                          className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
                        >
                          <FiDownload className="mr-1" /> Download Audio
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="flex justify-center items-center h-20">
                      <p>Loading audio...</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Answers Form Section */}
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Answers (1-40)
              </h3>
              <div className="grid grid-cols-5 gap-4">
                {formData.answers.map((answer, index) => (
                  <div key={index} className="flex flex-col">
                    <label
                      htmlFor={`answer-${index}`}
                      className="text-sm font-medium text-gray-700 mb-1"
                    >
                      Q{index + 1}
                    </label>
                    <input
                      id={`answer-${index}`}
                      type="text"
                      className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                      placeholder={`Answer ${index + 1}`}
                      value={answer}
                      onChange={(e) =>
                        handleAnswerChange(index, e.target.value)
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-8 flex justify-end">
                <Button
                  name={isSubmitting ? "Submitting..." : "Submit Answers"}
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Reusable meta information component
const MetaItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-gray-800">
        {String(value).charAt(0).toUpperCase() +
          String(value).slice(1).toLowerCase()}
      </p>
    </div>
  </div>
);

export default UserTestCatReadListen;
