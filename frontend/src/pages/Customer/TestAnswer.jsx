import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../../Context/AuthContext';
import { FiBook, FiClock, FiUser, FiBarChart2, FiType, FiLayers } from 'react-icons/fi';
import NavigatePages from '../../utils/NavigatePages';
import NavBar from '../../components/NavBar';
import Footer from "../../components/Footer";

const TestAnswer = () => {
  const { questionId } = useParams();
  const [answerDetail, setAnswerDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token, isLoggedIn, logout } = useAuth();
  const { goToLogin } = NavigatePages();

  useEffect(() => {
    if (!isLoggedIn) {
      toast.info("Please log in to view answers");
      goToLogin();
      return;
    }

    const fetchAnswerDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8081/api/yib/auth/answers/${questionId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
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
      } catch (error) {
        toast.error('Failed to load answer details');
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnswerDetails();
  }, [questionId, isLoggedIn, token, logout]);

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

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <NavBar />

      <div className="p-6 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Answer Details</h2>
          <p className="text-gray-600">Detailed breakdown of the writing question and model answer</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Side - Meta Information */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Question Information</h3>
              
              <div className="space-y-4">
                <MetaItem 
                  icon={<FiLayers className="text-blue-500" />}
                  label="Category"
                  value={answerDetail.category}
                />
                <MetaItem 
                  icon={<FiBarChart2 className="text-blue-500" />}
                  label="Difficulty"
                  value={answerDetail.difficulty}
                />
                <MetaItem 
                  icon={<FiType className="text-blue-500" />}
                  label="Task Type"
                  value={answerDetail.writingTaskType?.replace(/_/g, ' ').toLowerCase()}
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
          <div className="lg:w-3/4">
            {/* Question Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <FiBook className="text-blue-500" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">Question Prompt</h3>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-800 whitespace-pre-line text-lg leading-relaxed">
                  {answerDetail.question}
                </p>
              </div>
            </div>

            {/* Image */}
            {answerDetail.imageUrl && (
              <div className="mb-6 bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={answerDetail.imageUrl}
                  alt="Writing Question"
                  className="w-full object-cover"
                />
              </div>
            )}

            {/* Model Answer Card */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex items-center mb-4">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="font-bold text-xl text-gray-800">Model Answer</h3>
              </div>
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                  {answerDetail.answer}
                </p>
              </div>
            </div>

            {/* Explanation */}
            {answerDetail.explanation && (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-purple-100 p-2 rounded-full mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">Explanation</h3>
                </div>
                <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                  <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                    {answerDetail.explanation}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

// Reusable meta information component
const MetaItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="mt-1">{icon}</div>
    <div>
      <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
      <p className="text-sm font-semibold text-gray-800 capitalize">
        {String(value)}
      </p>
    </div>
  </div>
);

export default TestAnswer;