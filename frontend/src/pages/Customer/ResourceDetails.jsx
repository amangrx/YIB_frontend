import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { toast } from "react-toastify";
import {
  CircularProgress,
  Alert,
  Paper,
  Typography,
  Chip,
  Divider,
  Box,
  Container,
} from "@mui/material";
import { format } from "date-fns";
import { FiDownload, FiFileText } from "react-icons/fi";

const ResourceDetails = () => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { resourceId } = useParams();
  const { token, logout } = useAuth();
  const [pdfBlobUrl, setPdfBlobUrl] = useState(null);

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/yib/auth/resource/${resourceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data) {
          setResource({
            ...response.data,
            content: response.data.content
              ? JSON.parse(response.data.content)
              : null,
          });

          if (response.data.pdfFileUrl) {
            const pdfResponse = await fetch(
              `http://localhost:8081${response.data.pdfFileUrl}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const pdfBlob = await pdfResponse.blob();
            setPdfBlobUrl(URL.createObjectURL(pdfBlob));
          }
        } else {
          setError({ message: "No resource found", status: 404 });
        }
      } catch (error) {
        console.error("Error fetching resource:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          if (error.response.status === 401) {
            logout();
          }
          setError({
            message:
              error.response?.data?.message ||
              "You don't have permission to view this resource",
            status: error.response?.status,
          });
        } else {
          setError({
            message:
              error.response?.data?.message ||
              "Failed to load resource. Please try again later.",
            status: error.response?.status,
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResource();

    return () => {
      if (pdfBlobUrl) URL.revokeObjectURL(pdfBlobUrl);
    };
  }, [resourceId, token, logout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress size={60} thickness={4} />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <Container maxWidth="md" className="mt-8">
          <Alert severity="error" className="rounded-lg shadow">
            {error.message}
            {error.status && ` (Status: ${error.status})`}
          </Alert>
        </Container>
      </div>
    );
  }

  if (!resource) {
    return (
      <div>
        <NavBar />
        <Container maxWidth="md" className="mt-8">
          <Alert severity="info" className="rounded-lg shadow">
            No resource data available
          </Alert>
        </Container>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <NavBar />
      <Container maxWidth="lg" className="py-8">
        <Paper elevation={3} className="rounded-xl overflow-hidden">
          <Box className="p-8 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <Typography
                  variant="h3"
                  component="h1"
                  className="font-bold text-gray-800"
                  gutterBottom
                >
                  {resource.title}
                </Typography>
                <Typography
                  variant="subtitle1"
                  className="text-gray-600"
                  gutterBottom
                >
                  by {resource.author}
                </Typography>
              </div>
              <Chip
                label={resource.type === "PAID" ? "Premium" : "Free"}
                color={resource.type === "PAID" ? "secondary" : "primary"}
                size="medium"
                className="text-sm font-bold px-3 py-1"
              />
            </div>
          </Box>

          <Divider className="border-gray-200" />

          <Box className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <Typography variant="subtitle2" className="text-gray-500 mb-1">
                  Category
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {resource.category}
                </Typography>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <Typography variant="subtitle2" className="text-gray-500 mb-1">
                  Published
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {format(new Date(resource.createdAt), "MMMM d, yyyy")}
                </Typography>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <Typography variant="subtitle2" className="text-gray-500 mb-1">
                  Price
                </Typography>
                <Typography variant="body1" className="font-medium">
                  {resource.type === "FREE"
                    ? "Free Access"
                    : `$${resource.price?.toFixed(2)}`}
                </Typography>
              </div>
            </div>

            <div className="mb-8">
              <Typography
                variant="h6"
                className="font-semibold text-gray-700 mb-3"
              >
                Description
              </Typography>
              <Typography
                variant="body1"
                className="text-gray-600 leading-relaxed whitespace-pre-line"
              >
                {resource.description}
              </Typography>
            </div>

            {resource.pdfFileUrl && (
              <Box className="mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-3">
                      <FiFileText className="text-blue-600 text-xl" />
                    </div>
                    <Typography variant="h5" className="font-semibold">
                      Resource Document
                    </Typography>
                  </div>
                  <a
                    href={
                      pdfBlobUrl ||
                      `http://localhost:8081${resource.pdfFileUrl}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    download={`${resource.title.replace(
                      /[^a-z0-9]/gi,
                      "_"
                    )}.pdf`}
                  >
                    <FiDownload className="text-lg" />
                    <span>Download PDF</span>
                  </a>
                </div>

                <Box className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  {pdfBlobUrl ? (
                    <div className="h-[800px] w-full">
                      <iframe
                        src={`${pdfBlobUrl}#view=fitH`}
                        className="w-full h-full"
                        title="PDF Viewer"
                      >
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                          <Typography variant="h6" className="mb-4">
                            Your browser doesn't support PDF preview
                          </Typography>
                          <a
                            href={pdfBlobUrl}
                            className="text-blue-600 hover:underline font-medium"
                            download
                          >
                            Download the PDF to view it
                          </a>
                        </div>
                      </iframe>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-64">
                      <CircularProgress size={60} />
                      <Typography
                        variant="body1"
                        className="mt-4 text-gray-600"
                      >
                        Loading document preview...
                      </Typography>
                    </div>
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default ResourceDetails;
