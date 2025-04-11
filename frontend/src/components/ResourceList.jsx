import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaBook, FaHeadphones, FaMicrophone, FaPenNib } from "react-icons/fa"; 

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/api/yib/customers/get_resources")
      .then((response) => {
        setResources(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resources:", error);
      });
  }, []);

  // Function to get the appropriate icon based on the category
  const getCategoryIcon = (category) => {
    switch (category) {
      case "Writing":
        return <FaPenNib className="text-blue-500 text-3xl" />;
      case "Listening":
        return <FaHeadphones className="text-green-500 text-3xl" />;
      case "Reading":
        return <FaBook className="text-purple-500 text-3xl" />;
      case "Speaking":
        return <FaMicrophone className="text-red-500 text-3xl" />;
      default:
        return <FaBook className="text-gray-500 text-3xl" />;
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 flex justify-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {resources.map((resource) => (
            <div
              key={resource.resourceId} // Use resourceId as key
              onClick={() => navigate(`/resource_details/${resource.resourceId}`)} // Navigate to detail page
              className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center cursor-pointer transform transition duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Category Icon */}
              <div className="mb-4">{getCategoryIcon(resource.category)}</div>

              <h3 className="text-xl font-bold text-gray-800">{resource.resourceName}</h3>
              <p className="text-gray-500 mt-1">Category: {resource.category}</p>
              <p className="text-gray-500 mt-1">Difficulty: {resource.difficultyLevel}</p>
              <p className="text-gray-500 mt-1">Type: {resource.fileType}</p>

              <div className="mt-4 w-full text-center">
                <p className="font-medium text-gray-700">Resource File:</p>
                <p className="text-gray-900 font-semibold">{resource.fileName}</p>
              </div>

              {resource.additionalFileName && (
                <div className="mt-2 w-full text-center">
                  <p className="font-medium text-gray-700">Additional File:</p>
                  <p className="text-gray-900 font-semibold">{resource.additionalFileName}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceList;
