import { useState, useEffect } from "react";
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
  FaFilter,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";
import NavigatePages from "../utils/NavigatePages";
import { useLocation, useNavigate } from "react-router-dom";
import CheckResourcePaid from "../utils/CheckResourcePaid";
import PaymentDialog from "./PaymentDialog";
import FilterSidebar from "./FilterSidebar";
import CustomButton from "./CustomButton";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { goToLogin, goToResourceDetails } = NavigatePages();
  const { isLoggedIn, token, logout } = useAuth();
  const [selectedResource, setSelectedResource] = useState(null);
  const [openPayment, setOpenPayment] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  });

  const [workingFilters, setWorkingFilters] = useState({
    category: "",
    type: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "newest",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    const searchParams = new URLSearchParams(location.search);
    const searchTermFromUrl = searchParams.get("search") || "";
    const pageFromUrl = parseInt(searchParams.get("page")) || 0;
    const categoryFromUrl = searchParams.get("category") || "";
    const typeFromUrl = searchParams.get("type") || "";
    const minPriceFromUrl = searchParams.get("minPrice") || "";
    const maxPriceFromUrl = searchParams.get("maxPrice") || "";
    const sortByFromUrl = searchParams.get("sortBy") || "newest";

    setSearchTerm(searchTermFromUrl);
    setLocalSearchTerm(searchTermFromUrl);
    setCurrentPage(pageFromUrl);

    const initialFilters = {
      category: categoryFromUrl,
      type: typeFromUrl,
      minPrice: minPriceFromUrl,
      maxPrice: maxPriceFromUrl,
      sortBy: sortByFromUrl,
    };

    setFilters(initialFilters);
    setWorkingFilters(initialFilters);

    fetchResources(searchTermFromUrl, pageFromUrl, initialFilters);
  }, [location.search]);

  const fetchResources = async (searchTerm = "", page = 0, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const size = 9;
      let url;
      const params = new URLSearchParams({
        page: page,
        size: size,
      });

      if (searchTerm.trim()) {
        url = `http://localhost:8081/api/yib/customers/search`;
        params.append("title", searchTerm.trim());
      } else {
        url = `http://localhost:8081/api/yib/customers/resources/filter`;

        // Add filter parameters
        if (filters.category) params.append("category", filters.category);
        if (filters.type) params.append("type", filters.type);
        if (filters.minPrice) params.append("minPrice", filters.minPrice);
        if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);

        // Add sorting
        switch (filters.sortBy) {
          case "newest":
            params.append("sortBy", "createdAt");
            params.append("sortDir", "desc");
            break;
          case "oldest":
            params.append("sortBy", "createdAt");
            params.append("sortDir", "asc");
            break;
          case "title-asc":
            params.append("sortBy", "title");
            params.append("sortDir", "asc");
            break;
          case "title-desc":
            params.append("sortBy", "title");
            params.append("sortDir", "desc");
            break;
          default:
            params.append("sortBy", "createdAt");
            params.append("sortDir", "desc");
        }
      }

      const fullUrl = `${url}?${params.toString()}`;

      const response = await axios.get(fullUrl);
      setResources(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
      if (err.response?.status === 403) {
        toast.error("Please login to access these resources");
        if (isLoggedIn) {
          logout();
          goToLogin();
        }
      } else {
        toast.error("Failed to load resources");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    // Only add search term if it exists
    if (localSearchTerm.trim()) {
      params.set("search", localSearchTerm.trim());
    } else {
      // If search term is empty, remove the search param completely
      params.delete("search");
    }

    // Always reset to page 0 when searching
    params.set("page", "0");

    // Preserve filters in URL when searching
    if (filters.category) params.set("category", filters.category);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);

    navigate(`/library?${params.toString()}`);
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);

    if (searchTerm) {
      params.set("search", searchTerm);
    }
    params.set("page", newPage);

    // Preserve all other parameters
    if (filters.category) params.set("category", filters.category);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice);
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);

    navigate(`/library?${params.toString()}`);
  };

  const handleResourceClick = async (resource) => {
    if (!isLoggedIn || !token) {
      toast.error("Please log in to access this resource.");
      goToLogin();
      return;
    }

    if (resource.type === "FREE") {
      goToResourceDetails(resource.resourceId);
      return;
    }

    try {
      const result = await CheckResourcePaid(resource.resourceId, token);
      if (result.error) {
        toast.error(result.error);
        if (
          result.error.includes("Unauthorized") ||
          result.error.includes("401")
        ) {
          logout?.();
          goToLogin();
        }
        return;
      }

      if (result.hasPaid) {
        goToResourceDetails(resource.resourceId);
      } else {
        setSelectedResource(resource);
        setOpenPayment(true);
        toast.error("Please purchase this resource to access it.");
      }
    } catch (error) {
      console.error("Payment check error:", error);
      toast.error("Error checking payment status");
      if (
        error.message.includes("Unauthorized") ||
        error.message.includes("401")
      ) {
        logout?.();
        goToLogin();
      }
    }
  };

  const handleApplyFilters = () => {
    setFilters(workingFilters);
    setCurrentPage(0);
    setSearchTerm("");
    setLocalSearchTerm("");

    const params = new URLSearchParams();
    params.set("page", "0");
    if (workingFilters.category)
      params.set("category", workingFilters.category);
    if (workingFilters.type) params.set("type", workingFilters.type);
    if (workingFilters.minPrice)
      params.set("minPrice", workingFilters.minPrice);
    if (workingFilters.maxPrice)
      params.set("maxPrice", workingFilters.maxPrice);
    if (workingFilters.sortBy) params.set("sortBy", workingFilters.sortBy);

    navigate(`/library?${params.toString()}`);
    setIsFilterOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      category: "",
      type: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "newest",
    };
    setWorkingFilters(resetFilters);
    setFilters(resetFilters);
    setCurrentPage(0);
    setSearchTerm("");
    setLocalSearchTerm("");

    navigate(`/library?page=0`);
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

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-seagreen"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 border-b-4 border-seagreen w-fit pb-2">
            IELTS Learning Resources
          </h1>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 md:flex-none md:w-64"
            >
              {/* <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="block w-full pl-10 pr-3 py-2 rounded-full border border-gray-300 
                          focus:outline-none focus:ring-2 focus:ring-seagreen focus:border-transparent
                          transition-all duration-200"
                  value={localSearchTerm}
                  onChange={(e) => setLocalSearchTerm(e.target.value)}
                />
              </div> */}
            </form>

            <div className="lg:hidden">
              <CustomButton
                text="Filters"
                icon={FaFilter}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <FilterSidebar
            isFilterOpen={isFilterOpen}
            setIsFilterOpen={setIsFilterOpen}
            workingFilters={workingFilters}
            setWorkingFilters={setWorkingFilters}
            handleApplyFilters={handleApplyFilters}
            handleResetFilters={handleResetFilters}
            categoryOptions={categoryOptions}
          />

          <div className="lg:w-3/4">
            {resources.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {searchTerm
                    ? "No resources found matching your search."
                    : "No resources available yet."}
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {resources.map((resource) => {
                    const categoryInfo = getCategoryInfo(resource.category);
                    const isPaid = resource.type === "PAID";

                    return (
                      <div
                        key={resource.resourceId}
                        onClick={() => handleResourceClick(resource)}
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

                        <div className="p-4 border-t border-gray-200 bg-gray-50">
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
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center gap-3">
                      <CustomButton
                        text="Previous"
                        icon={FaChevronLeft}
                        onClick={() =>
                          handlePageChange(Math.max(0, currentPage - 1))
                        }
                        disabled={currentPage === 0}
                      />

                      <div className="flex items-center gap-2">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            let pageNum;
                            if (totalPages <= 5) {
                              pageNum = i;
                            } else if (currentPage <= 2) {
                              pageNum = i;
                            } else if (currentPage >= totalPages - 3) {
                              pageNum = totalPages - 5 + i;
                            } else {
                              pageNum = currentPage - 2 + i;
                            }

                            return (
                              <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`px-3 py-1 rounded-md ${
                                  currentPage === pageNum
                                    ? "bg-seagreen text-white"
                                    : "border border-gray-300"
                                }`}
                              >
                                {pageNum + 1}
                              </button>
                            );
                          }
                        )}
                      </div>

                      <CustomButton
                        text="Next"
                        icon={FaChevronRight}
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages - 1, currentPage + 1)
                          )
                        }
                        disabled={currentPage === totalPages - 1}
                      />
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {selectedResource && (
        <PaymentDialog
          open={openPayment}
          onClose={() => setOpenPayment(false)}
          resource={selectedResource}
        />
      )}
    </div>
  );
};

export default ResourceList;
