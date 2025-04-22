import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import Table from "../../components/Table";
import { useAuth } from "../../Context/AuthContext";
import axios from "axios";

const MyUploads = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/yib/expert/my-uploads`,
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );
        setResources(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [token]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          status === "APPROVED"
            ? "bg-green-100 text-green-800"
            : status === "REJECTED"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const columns = [
    { key: "resourceId", label: "ID" },
    { key: "title", label: "Title" },
    { key: "category", label: "Category" },
    { key: "description", label: "Description" },
    {
      key: "status",
      label: "Status",
      render: (status) => getStatusBadge(status),
    },
    {
      key: "createdAt",
      label: "Created At",
      render: (date) => formatDate(date),
    },
    { key: "type", label: "Resource Type" },
    { key: "price", label: "Price" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar with fixed width */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>

      {/* Main content area with left margin equal to sidebar width */}
      <div className="flex-1 ml-64">
        <div className="p-6">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                My Uploads
              </h1>
              <p className="text-gray-600 mt-1">
                View all your uploaded resources
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  loading
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
                }`}
              >
                {loading ? "Loading..." : `${resources.length} Resources`}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">
                Total Uploads
              </h3>
              <p className="text-2xl font-semibold mt-1">{resources.length}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Approved</h3>
              <p className="text-2xl font-semibold mt-1 text-green-600">
                {resources.filter((r) => r.status === "APPROVED").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-semibold mt-1 text-yellow-600">
                {resources.filter((r) => r.status === "PENDING").length}
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Rejected</h3>
              <p className="text-2xl font-semibold mt-1 text-red-600">
                {resources.filter((r) => r.status === "REJECTED").length}
              </p>
            </div>
          </div>

          {/* Table Section */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-800">
                My Resources
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                View your uploaded resources
              </p>
            </div>
            <div className="overflow-x-auto">
              <Table
                columns={columns}
                data={resources}
                loading={loading}
                error={error}
              />
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyUploads;