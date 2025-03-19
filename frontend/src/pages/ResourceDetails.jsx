import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

const ResourceDetails = () => {
  const { id } = useParams(); // Get resourceId from URL
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/yib/resources/resource_details/${id}`)
      .then((response) => {
        setResource(response.data);
      })
      .catch((error) => {
        console.error("Error fetching resource:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        {resource ? (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {resource.resourceName}
            </h1>
            <p className="text-gray-600">Category: {resource.category}</p>
            <p className="text-gray-600">Difficulty: {resource.difficultyLevel}</p>
            <p className="text-gray-600">Type: {resource.fileType}</p>

            {/* File Preview */}
            {resource.fileUrl && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Preview:</h2>
                {resource.fileType.includes("image") ? (
                  <img src={resource.fileUrl} alt="Resource" className="w-full rounded-md" />
                ) : resource.fileType.includes("pdf") ? (
                  <iframe src={resource.fileUrl} className="w-full h-96 border" title="PDF Preview"></iframe>
                ) : resource.fileType.includes("audio") ? (
                  <audio controls className="w-full">
                    <source src={resource.fileUrl} type={resource.fileType} />
                    Your browser does not support the audio element.
                  </audio>
                ) : resource.fileType.includes("video") ? (
                  <video controls className="w-full rounded-md">
                    <source src={resource.fileUrl} type={resource.fileType} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <a
                    href={resource.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download Main File
                  </a>
                )}
              </div>
            )}

            {/* Additional File Preview */}
            {resource.additionalFileUrl && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold mb-2">Additional File:</h2>
                {resource.additionalFileType.includes("image") ? (
                  <img src={resource.additionalFileUrl} alt="Additional Resource" className="w-full rounded-md" />
                ) : resource.additionalFileType.includes("pdf") ? (
                  <iframe src={resource.additionalFileUrl} className="w-full h-96 border" title="PDF Preview"></iframe>
                ) : resource.additionalFileType.includes("audio") ? (
                  <audio controls className="w-full">
                    <source src={resource.additionalFileUrl} type={resource.additionalFileType} />
                    Your browser does not support the audio element.
                  </audio>
                ) : resource.additionalFileType.includes("video") ? (
                  <video controls className="w-full rounded-md">
                    <source src={resource.additionalFileUrl} type={resource.additionalFileType} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <a
                    href={resource.additionalFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Download Additional File
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-center text-red-500">Resource not found</p>
        )}
      </div>
    </>
  );
};

export default ResourceDetails;
