import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";
import {
  FiBook,
  FiClock,
  FiUser,
  FiBarChart2,
  FiFileText,
  FiHeadphones,
  FiDownload,
} from "react-icons/fi";
import NavigatePages from "../../utils/NavigatePages";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const ListeningReadingAnswer = () => {
  const { questionId } = useParams();
  const [answerDetail, setAnswerDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isLoggedIn, logout } = useAuth();
  const { goToLogin } = NavigatePages();

  const API_BASE_URL = "http://localhost:8081";

  // State for blob URLs
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);
  const [audioBlobUrl, setAudioBlobUrl] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("Please log in to view answers");
      goToLogin();
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
        setAnswerDetail(data);

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

  if (!answerDetail) {
    return (
      <div>
        <NavBar />
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No answer details found</p>
        </div>
      </div>
    );
  }

  const hasListeningAudio = answerDetail.audioFileUrl;
  const hasPdf = answerDetail.pdfFileUrl;

  return (
    <div>
      <NavBar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            {answerDetail.title}
          </h2>
          <p className="text-gray-600">
            {hasListeningAudio
              ? "Listening Question and Answer Details"
              : "Reading Question and Answer Details"}
          </p>
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
                  value={answerDetail.category}
                />
                <MetaItem
                  icon={<FiBarChart2 className="text-blue-500" />}
                  label="Difficulty"
                  value={answerDetail.difficulty}
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
                  value={answerDetail.createdBy}
                />

                <div className="pt-4 border-t">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <FiClock className="text-blue-500" />
                    <span>Created: {formatDate(answerDetail.createdAt)}</span>
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
                      pdfBlobUrl || `${API_BASE_URL}${answerDetail.pdfFileUrl}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                    download={`${answerDetail.title}.pdf`}
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
                          download={`${answerDetail.title}.mp3`}
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

            {/* Answers Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-800">
                  Correct Answers
                </h3>
              </div>

              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                {answerDetail.answers && answerDetail.answers.length > 0 ? (
                  <ol className="list-decimal pl-5 space-y-2">
                    {answerDetail.answers.map((answer, index) => (
                      <li key={index} className="text-gray-800">
                        <span className="font-semibold">
                          Question {index + 1}:
                        </span>{" "}
                        {answer}
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-gray-500">
                    No answers provided for this question.
                  </p>
                )}
              </div>
            </div>
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

export default ListeningReadingAnswer;