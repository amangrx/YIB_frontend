import React from "react";
import NavBar from "../components/NavBar";
import ResourceList from "../components/ResourceList";
import Footer from "../components/Footer";

const Library = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content - Resource List */}
      <div className="flex-grow">
        <ResourceList />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Library;