import React from 'react';
import Sidebar from '../../components/SideBar';
import { FiHome, FiUsers, FiSettings, FiBook, FiBarChart2, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const ExpertDashboard = () => {
  // Static data for demonstration
  const stats = [
    { title: "Total Students", value: "245", icon: <FiUsers className="text-blue-500" />, change: "+12% from last month" },
    { title: "Active Courses", value: "18", icon: <FiBook className="text-green-500" />, change: "+3 new this month" },
    { title: "Messages", value: "32", icon: <FiMessageSquare className="text-purple-500" />, change: "5 unread" },
    { title: "Upcoming Sessions", value: "7", icon: <FiCalendar className="text-orange-500" />, change: "Next in 2 days" }
  ];

  const recentActivities = [
    { id: 1, user: "Sarah Johnson", action: "completed Module 3", course: "Advanced Mathematics", time: "2 hours ago" },
    { id: 2, user: "Michael Chen", action: "submitted Assignment 2", course: "Data Structures", time: "5 hours ago" },
    { id: 3, user: "Emma Wilson", action: "asked a question in", course: "Algorithms 101", time: "1 day ago" },
    { id: 4, user: "David Kim", action: "achieved 95% on", course: "Quiz #4", time: "2 days ago" }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed width */}
      <div className="w-64 fixed h-full">
        <Sidebar />
      </div>
      
      {/* Main Content - With left margin equal to sidebar width */}
      <div className="flex-1 ml-64 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Expert Dashboard</h1>
          <p className="text-gray-600">Welcome back, Dr. Smith! Here's what's happening today.</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className="p-3 rounded-full bg-gray-50">
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activities */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Recent Activities</h2>
              <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100 last:border-0">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                    {activity.user.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{activity.user} <span className="font-normal text-gray-600">{activity.action}</span></p>
                    <p className="text-sm text-gray-500">{activity.course} · {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
            <div className="space-y-3">
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <FiBook className="mr-3 text-green-500" />
                <span>Create New Course</span>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <FiCalendar className="mr-3 text-blue-500" />
                <span>Schedule Session</span>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <FiBarChart2 className="mr-3 text-purple-500" />
                <span>View Analytics</span>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <FiMessageSquare className="mr-3 text-orange-500" />
                <span>Check Messages</span>
              </button>
              <button className="w-full flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
                <FiSettings className="mr-3 text-gray-500" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertDashboard;