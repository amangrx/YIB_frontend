import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/SideBar';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const CusDashboard = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedAnswers, setExpandedAnswers] = useState({});
  const { token } = useAuth();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await axios.get('http://localhost:8081/api/yib/auth/dashboard/tests', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setTests(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [token]);

  const toggleAnswerExpansion = (id) => {
    setExpandedAnswers(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64 flex-1 p-8 flex items-center justify-center"> {/* Added ml-64 */}
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-3 text-gray-600">Loading your writing tests...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64 flex-1 p-8 flex items-center justify-center"> {/* Added ml-64 */}
          <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Error loading tests</h3>
                <p className="mt-1 text-sm text-gray-600">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="ml-64 flex-1 p-6 lg:p-8"> {/* Added ml-64 */}
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Writing Test History</h1>
              <p className="mt-1 text-sm text-gray-500">Review all your previous writing test submissions</p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                {tests.length} {tests.length === 1 ? 'Test' : 'Tests'}
              </span>
            </div>
          </div>
          
          {tests.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No writing tests found</h3>
              <p className="mt-1 text-sm text-gray-500">Your completed writing tests will appear here.</p>
            </div>
          ) : (
            <div className="bg-white shadow-sm rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        #
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Answer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Feedback
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tests.map((test, index) => {
                      const isExpanded = expandedAnswers[test.id];
                      const answerPreview = test.answer?.length > 100 
                        ? `${test.answer.substring(0, 100)}...` 
                        : test.answer;
                      
                      return (
                        <tr key={`${test.questionId}-${test.submittedAt}`} className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-indigo-100 text-indigo-800">
                              {index + 1}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900 font-medium">
                              {test.duration || '-'} min
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {test.questionCategory || '-'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 max-w-xs">
                            <div className={`whitespace-pre-wrap ${isExpanded ? '' : 'line-clamp-3'}`}>
                              {test.answer || '-'}
                            </div>
                            {test.answer?.length > 100 && (
                              <button 
                                onClick={() => toggleAnswerExpansion(test.id)}
                                className="mt-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                              >
                                {isExpanded ? 'Show less' : 'Show more'}
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`text-sm font-medium ${
                              test.score > 0 ? 'text-green-600' : 'text-gray-500'
                            }`}>
                              {test.score !== undefined ? test.score : '-'}
                              {test.score !== undefined && (
                                <span className="text-xs text-gray-400 ml-1">/ 9.0</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-800 max-w-xs whitespace-pre-wrap">
                            <div className={`${isExpanded ? '' : 'line-clamp-2'}`}>
                              {test.feedback || '-'}
                            </div>
                            {test.feedback?.length > 100 && (
                              <button 
                                onClick={() => toggleAnswerExpansion(`feedback-${test.id}`)}
                                className="mt-1 text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                              >
                                {expandedAnswers[`feedback-${test.id}`] ? 'Show less' : 'Show more'}
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="bg-gray-50 px-6 py-3 flex items-center justify-between border-t border-gray-200">
                <div className="flex-1 flex justify-between items-center">
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">{tests.length}</span> of{' '}
                    <span className="font-medium">{tests.length}</span> results
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CusDashboard;