import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FiUser, FiBook, FiBarChart2, FiType, FiImage } from "react-icons/fi";
import { useAuth } from "../../Context/AuthContext";
import NavigatePages from "../../utils/NavigatePages";
import FormattedDate from "../../utils/FormattedDate";

const Button = ({ name, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-seagreen text-white text-base px-6 py-3 rounded-md cursor-pointer font-medium opacity-100 hover:opacity-80 hover:-translate-y-1 transition-all duration-300 ${className}`}
    >
      {name}
    </button>
  );
};

const WritingTest = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const { goToLogin, goToUserTest, goToTestAnswer } = NavigatePages();

  const formatTaskType = (taskType) => {
    return taskType.replace(/_/g, " ").toLowerCase();
  };

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:8081/api/yib/customers/test/writing"
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setQuestions(data || []);
    } catch (error) {
      toast.error("Failed to load questions");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleTakeTest = (questionId) => {
    if (!isLoggedIn) {
      toast.info("Please log in to take the test");
      goToLogin();
    } else {
      goToUserTest(questionId);
    }
  };

  const handleShowAnswers = (questionId) => {
    if (!isLoggedIn) {
      toast.info("Please log in to view answers");
      goToLogin();
    } else {
      goToTestAnswer(questionId);
    }
  };

  const ImagePlaceholder = () => (
    <div className="h-48 bg-gray-100 flex flex-col items-center justify-center text-gray-400">
      <FiImage className="text-4xl mb-2" />
      <p className="text-sm">No image available</p>
    </div>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Writing Test Questions
        </h2>
        <p className="text-gray-600">
          Browse available writing tasks and practice your skills
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : questions.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No questions found</p>
          <Button name="Retry" onClick={fetchQuestions} className="mt-4" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {question.imageUrl ? (
                <div className="h-48 overflow-hidden">
                  <img
                    src={question.imageUrl}
                    alt="Question visual"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.parentElement.innerHTML = <ImagePlaceholder />;
                    }}
                  />
                </div>
              ) : (
                <ImagePlaceholder />
              )}

              <div className="p-6">
                <h3 className="font-bold text-xl mb-4 text-gray-800 line-clamp-2">
                  {question.question}
                </h3>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <FiBook className="text-blue-500" />
                    <div>
                      <p className="text-xs text-gray-500">Category</p>
                      <p className="text-sm font-medium capitalize">
                        {question.category.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FiBarChart2 className="text-green-500" />
                    <div>
                      <p className="text-xs text-gray-500">Difficulty</p>
                      <p className="text-sm font-medium capitalize">
                        {question.difficulty.toLowerCase()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FiType className="text-purple-500" />
                    <div>
                      <p className="text-xs text-gray-500">Task Type</p>
                      <p className="text-sm font-medium capitalize">
                        {formatTaskType(question.writingTaskType)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <FiUser className="text-yellow-500" />
                    <div>
                      <p className="text-xs text-gray-500">Author</p>
                      <p className="text-sm font-medium truncate">
                        {question.createdBy}
                      </p>
                    </div>
                  </div>
                </div>

                <FormattedDate
                  dateString={question.createdAt}
                  className="border-t pt-4"
                />

                <div className="mt-6 flex gap-4">
                  <Button
                    name="Take This Test"
                    onClick={() => handleTakeTest(question.id)}
                    className="flex-1"
                  />
                  <Button
                    name="Show Answers"
                    onClick={() => handleShowAnswers(question.id)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WritingTest;
