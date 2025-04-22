import React from "react";
import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import {
  CircularProgress,
  Alert,
  Paper,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
import { format } from "date-fns";
import EditorJsRenderer from "../../utils/EditorJsRenderer";

const ResourceDetails = () => {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { resourceId } = useParams();
  const { token, logout } = useAuth();

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
          console.log(JSON.parse(response.data.content));
          setResource(response.data);
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
  }, [resourceId, token, logout]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <NavBar />
        <div className="p-4">
          <Alert severity="error">
            {error.message}
            {error.status && ` (Status: ${error.status})`}
          </Alert>
        </div>
      </div>
    );
  }

  if (!resource) {
    return (
      <div>
        <NavBar />
        <div className="p-4">
          <Alert severity="info">No resource data available</Alert>
        </div>
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-4xl mx-auto p-4">
        <Paper elevation={3} className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <Typography variant="h4" component="h1" gutterBottom>
                {resource.title}
              </Typography>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                by {resource.author}
              </Typography>
            </div>
            <div className="flex space-x-2">
              <Chip
                label={resource.status}
                color={resource.status === "ACTIVE" ? "success" : "default"}
                size="small"
              />
              <Chip label={resource.type} color="primary" size="small" />
            </div>
          </div>
          <Divider className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <Typography variant="subtitle2" color="textSecondary">
                Category
              </Typography>
              <Typography variant="body1">{resource.category}</Typography>
            </div>
            <div>
              <Typography variant="subtitle2" color="textSecondary">
                Created At
              </Typography>
              <Typography variant="body1">
                {format(new Date(resource.createdAt), "MMM dd, yyyy")}
              </Typography>
            </div>
            <div>
              <Typography variant="subtitle2" color="textSecondary">
                Price
              </Typography>
              <Typography variant="body1">
                ${resource.price?.toFixed(2)}
              </Typography>
            </div>
          </div>
          <div className="mb-6">
            <Typography variant="subtitle2" color="textSecondary">
              Description
            </Typography>
            <Typography variant="body1" className="whitespace-pre-line">
              {resource.description}
            </Typography>
          </div>
          <EditorJsRenderer
            data={{
              time: Date.now(),
              blocks: [
                {
                  type: "paragraph",
                  data: { text: "Test content working" },
                },
              ],
              version: "2.22.2",
            }}
          />

          {/* <div>
            <Typography variant="subtitle2" color="textSecondary" gutterBottom>
              Content
            </Typography>
            <Paper elevation={0} className="p-4 bg-gray-50 rounded-lg">
              <EditorJsRenderer data={resource.content} />
            </Paper>
          </div>
          <Paper elevation={0} className="p-4 bg-gray-50 rounded-lg">
          
            <pre style={{ fontSize: "10px", marginBottom: "20px" }}>
              {JSON.stringify(resource.content, null, 2)}
            </pre>
            <EditorJsRenderer data={resource.content} />
          </Paper> */}
        </Paper>
      </div>
    </div>
  );
};

export default ResourceDetails;
