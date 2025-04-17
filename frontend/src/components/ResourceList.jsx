import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaBook,
  FaHeadphones,
  FaMicrophone,
  FaPenNib,
  FaCalendarAlt,
  FaUser,
  FaLightbulb,
  FaClock,
  FaChartLine,
  FaExclamationTriangle,
  FaTag,
  FaDollarSign,
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import NavigatePages from "../utils/NavigatePages";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const {goToLogin, goToResourceDetails} = NavigatePages();
  const {isLoggedIn} = useAuth();

  // Category options with corresponding icons
  const categoryOptions = [
    {
      value: "grammar-tips",
      label: "Grammar Tips",
      icon: <FaLightbulb className="text-yellow-500 text-3xl" />,
    },
    {
      value: "vocabulary",
      label: "Vocabulary Building",
      icon: <FaBook className="text-blue-500 text-3xl" />,
    },
    {
      value: "writing",
      label: "Writing Skills",
      icon: <FaPenNib className="text-green-500 text-3xl" />,
    },
    {
      value: "speaking",
      label: "Speaking Tips",
      icon: <FaMicrophone className="text-red-500 text-3xl" />,
    },
    {
      value: "listening",
      label: "Listening Tips",
      icon: <FaHeadphones className="text-purple-500 text-3xl" />,
    },
    {
      value: "reading",
      label: "Reading Techniques",
      icon: <FaBook className="text-indigo-500 text-3xl" />,
    },
    {
      value: "test-strategies",
      label: "Test Strategies",
      icon: <FaChartLine className="text-teal-500 text-3xl" />,
    },
    {
      value: "time-management",
      label: "Time Management",
      icon: <FaClock className="text-orange-500 text-3xl" />,
    },
    {
      value: "sample-answers",
      label: "Sample Answers",
      icon: <FaBook className="text-pink-500 text-3xl" />,
    },
    {
      value: "common-mistakes",
      label: "Common Mistakes",
      icon: <FaExclamationTriangle className="text-amber-500 text-3xl" />,
    },
  ];

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/api/yib/customers/resources"
        );
        setResources(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const checkIfLoggedIn = () => {
    if (!isLoggedIn) {
      toast.error("Please log in to access this page.");
      goToLogin();
    }else{

    }
  };


  const getCategoryInfo = (categoryValue) => {
    return (
      categoryOptions.find((option) => option.value === categoryValue) || {
        label: categoryValue,
        icon: <FaBook className="text-gray-500 text-3xl" />,
      }
    );
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seagreen"></div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );

    return (
      <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b-4 border-seagreen w-fit pb-2">
            IELTS Learning Resources
          </h1>
  
          {resources.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No resources available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => {
                const categoryInfo = getCategoryInfo(resource.category);
                const isPaid = resource.type === "PAID";
  
                return (
                  <div
                    key={resource.resourceId}
                    onClick={() => navigate(`/library/${resource.resourceId}`)}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-gray-200 flex flex-col h-full"
                  >
                    <div className="p-6 flex-grow">
                      <div className="flex items-center mb-4">
                        <div className="mr-4">{categoryInfo.icon}</div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {resource.title}
                          </h3>
                          <span className="inline-block bg-blue-200 text-seagreen text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide mt-1">
                            {categoryInfo.label}
                          </span>
                        </div>
                      </div>
  
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {resource.description}
                      </p>
  
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FaUser className="mr-2" />
                        <span>{resource.author}</span>
                      </div>
  
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <FaCalendarAlt className="mr-2" />
                        <span>{formatDate(resource.createdAt)}</span>
                      </div>
  
                      {isPaid && (
                        <div className="flex items-center text-sm text-gray-500 mb-2">
                          <FaDollarSign className="mr-2" />
                          <span>NPR {resource.price || "0.00"}</span>
                        </div>
                      )}
                    </div>
  
                    {/* Fixed bottom section for status and type */}
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <div className="flex justify-between items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${
                            isPaid
                              ? "bg-purple-100 text-purple-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          <FaTag className="mr-1" />
                          {resource.type || "FREE"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  };
export default ResourceList;
