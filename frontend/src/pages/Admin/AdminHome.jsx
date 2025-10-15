import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import { useAuth } from '../../Context/AuthContext';
import axios from 'axios';

const AdminHome = () => {
  const userName = "Admin";
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0
  });

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:8081/api/yib/admin/testimonials', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        // Handle different response formats
        let testimonialsData = [];
        if (Array.isArray(response.data)) {
          testimonialsData = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          testimonialsData = response.data.data;
        } else if (response.data && Array.isArray(response.data.testimonials)) {
          testimonialsData = response.data.testimonials;
        }

        setTestimonials(testimonialsData);
        
        // Calculate stats
        setStats({
          total: testimonialsData.length,
          approved: testimonialsData.filter(t => t.approved).length,
          pending: testimonialsData.filter(t => !t.approved).length
        });
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError(err.response?.data?.message || err.message || 'Failed to fetch testimonials');
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [token]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const renderTestimonialsTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-50 rounded-md">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          >
            Retry
          </button>
        </div>
      );
    }

    if (!testimonials.length) {
      return (
        <div className="p-8 text-center text-gray-500">
          No testimonials found
        </div>
      );
    }

    return (
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Full Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comments</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {testimonials.map((testimonial) => (
              <tr key={testimonial.testimonialId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{testimonial.testimonialId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {testimonial.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {testimonial.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {testimonial.phoneNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(testimonial.uploadedDate)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                  <div className="line-clamp-2" title={testimonial.comments}>
                    {testimonial.comments}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${testimonial.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {testimonial.approved ? 'Approved' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 fixed h-full bg-indigo-700 text-white">
        <Sidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome back, {userName}!</span>
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold">
                {userName.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto py-6 px-8">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <h3 className="text-gray-500 text-sm font-medium">Total Testimonials</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-green-500 text-sm mt-1">All testimonials</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
              <h3 className="text-gray-500 text-sm font-medium">Approved</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.approved}</p>
              <p className="text-green-500 text-sm mt-1">{stats.total > 0 ? `${Math.round((stats.approved/stats.total)*100)}% of total` : '0%'}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
              <h3 className="text-gray-500 text-sm font-medium">Pending Approval</h3>
              <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
              <p className="text-red-500 text-sm mt-1">{stats.total > 0 ? `${Math.round((stats.pending/stats.total)*100)}% of total` : '0%'}</p>
            </div>
          </div>

          {/* Testimonials Table Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Testimonials</h2>
            {renderTestimonialsTable()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminHome;