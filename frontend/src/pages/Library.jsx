import React, { useState } from "react";
import NavBar from "../components/NavBar";
import ResourceList from "../components/ResourceList";
import Footer from "../components/Footer";

const Library = () => {
  const [section, setSection] = useState("");
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      <div className="flex flex-grow gap-4 p-6">
        {/* Sidebar with Filters */}
        {/* Sidebar with Filters */}
        <div className="w-1/5 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Filter Resources
          </h3>

          {/* Section Dropdown */}
          <label className="text-gray-700 font-medium mb-2 block">
            Section
          </label>
          <select
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full mb-4 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            <option value="">All Sections</option>
            <option value="Writing">Writing</option>
            <option value="Listening">Listening</option>
            <option value="Reading">Reading</option>
            <option value="Speaking">Speaking</option>
          </select>

          {/* Difficulty Dropdown */}
          <label className="text-gray-700 font-medium mb-2 block">
            Difficulty
          </label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-gray-300 p-2 rounded-md w-full focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
          >
            <option value="">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Resource List */}
        <div className="flex-grow">
          <h2 className="text-3xl lg:text-3xl font-bold text-gray-800 mb-6 border-b-4 border-seagreen w-fit pb-2 ml-20">
            Resources Library
          </h2>
          <ResourceList section={section} difficulty={difficulty} />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Library;
