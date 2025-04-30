import React from "react";
import { FaClipboardList, FaBookOpen, FaTasks, FaSearch } from "react-icons/fa";
import { RiFileList3Line, RiBookOpenLine } from "react-icons/ri";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {
  home_bg_2,
  card1,
  card2,
  card3,
  card4,
  card5
} from "../utils/UseImages";
import NavigatePages from "../utils/NavigatePages";
import Card from "../components/Card";

const Home = () => {
  const { goToTakeTest, goToLibrary } = NavigatePages();

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <NavBar />
      {/* Top section */}
      <div className="w-full mb-24 flex flex-col items-center text-center mt-32">
        <div className="mt-3">
          <h1 className="text-7xl font-bold mb-8">Your IELTS Book</h1>
          <h2 className="text-5xl font-semibold text-seagreen mb-9 animate-fade-up">
            Your Personalized Path to IELTS Success
          </h2>
        </div>

        <p className="text-lg max-w-3xl mb-17">
          Your IELTS Book is your smart companion for IELTS preparation,
          offering AI-powered practice tests, personalized study plans, and
          real-time feedback. With mock exams, a vast resource library, and
          expert guidance, we help you achieve your target band efficiently.
        </p>

        <div className="flex space-x-4 mb-12">
          <button
            className="flex items-center gap-2 bg-seagreen text-white text-base px-6 py-3 rounded-md cursor-pointer font-semibold opacity-100 hover:opacity-80 hover:-translate-y-3 transition-all duration-300"
            onClick={goToTakeTest}
          >
            <RiFileList3Line size={20} />
            Start Mock Test
          </button>
          <button
            className="flex items-center gap-2 bg-stone-300 text-black text-base px-6 py-3 rounded-md cursor-pointer font-semibold opacity-100 hover:opacity-80 hover:-translate-y-3 transition-all duration-300"
            onClick={goToLibrary}
          >
            <RiBookOpenLine size={20} />
            Browse Resources
          </button>
        </div>
      </div>
      {/* ending of the top section */}

      {/* Starting of our features card section */}
      <div className="text-center mt-10">
        <h2 className="text-4xl font-bold">Our Features:</h2>
      </div>

      {/* Cards Section */}
      <div className="flex justify-center space-x-6 mt-10 mb-24">
        <Card
          logo={<FaClipboardList className="text-red-500 w-10 h-10" />}
          title="Take a Mock Test"
          description="Simulate real IELTS test conditions with our timed mock exams and get instant feedback."
          onClick={goToTakeTest}
        />
        <Card
          logo={<FaBookOpen className="text-blue-500 w-10 h-10" />}
          title="Access Study Resources"
          description="Browse a comprehensive library of practice tests, study guides, and expert tips to boost your IELTS score."
          onClick={goToLibrary}
        />
        <Card
          logo={<FaTasks className="text-green-500 w-10 h-10" />}
          title="Focus on Weak Areas"
          description="Improve your performance by practicing specific IELTS sections tailored to your needs."
          onClick={goToTakeTest}
        />
      </div>
      {/* ending of the card section  */}

      {/* Content section */}
      <div className="max-w-6xl mx-auto p-8">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-5xl font-extrabold">
            Achieve Your Target IELTS Score
          </h1>
          <h3 className="text-3xl text-gray-600 mt-4">
            Personalized learning with AI-powered insights
          </h3>
        </div>

        {/* Content Section */}
        <div className="flex items-center justify-between gap-8">
          {/* Left Side (Text) */}
          <div className="w-1/2">
            <h2 className="text-4xl font-bold mb-4">Welcome to IELTS Prep</h2>
            <ul className="text-lg text-gray-700 list-disc pl-5 space-y-2">
              <li>AI-powered practice tests for writing section</li>
              <li>Personalized study plans tailored to your needs</li>
              <li>
                Expert feedback to improve your writing and speaking skills
              </li>
              <li>Track your progress and achieve your target band score</li>
            </ul>
          </div>

          {/* Right Side (Image) */}
          <div className="w-1/2 flex justify-end">
            <img
              src={home_bg_2}
              alt=""
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
      {/* endiing of content section */}

      {/* Why Choose IELTS Section */}
      <div className="w-full max-w-6xl mx-auto mt-14">
        <h2 className="text-4xl font-bold mb-6 flex items-center">
          <span className="text-seagreen text-5xl mr-2">|</span> Why choose
          IELTS?
        </h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex">
            <div className="w-1/2">
              <h3 className="text-xl font-bold text-seagreen mb-2">
                Globally Recognized & Trusted
              </h3>
              <p className="text-gray-700">
                IELTS is accepted by 12,500+ institutions, including top
                universities, employers, and governments worldwide.
              </p>
            </div>
            <div className="w-1/2">
              <img
                src={card1}
                alt="Trusted"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex">
            <div className="w-1/2">
              <h3 className="text-xl font-bold text-seagreen mb-2">
                Flexible & Convenient
              </h3>
              <p className="text-gray-700">
                Choose between IELTS on paper or computer, with multiple test
                dates available throughout the year.
              </p>
            </div>
            <div className="w-1/2">
              <img
                src={card2}
                alt="Faster results"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex">
            <div className="w-1/2">
              <h3 className="text-xl font-bold text-seagreen mb-2">
                Faster & Reliable Results
              </h3>
              <p className="text-gray-700">
                Get results in as little as 3-5 days with IELTS on computer,
                helping you move forward faster.
              </p>
            </div>
            <div className="w-1/2">
              <img
                src={card3}
                alt="Improve Score"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md rounded-lg p-6 flex">
            <div className="w-1/2">
              <h3 className="text-xl font-bold text-seagreen mb-2">
                Fair & Accurate Scoring
              </h3>
              <p className="text-gray-700">
                IELTS uses human and AI-assisted evaluation to ensure a fair
                assessment of your English skills
              </p>
            </div>
            <div className="w-1/2">
              <img
                src={card4}
                alt="Faster results"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Your ielts book card section */}
      <div className="max-w-6xl mx-auto mt-18 p-8">
        {/* Heading Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold">
            Your IELTS Book - Study & Practice Tests Online
          </h1>
          <h3 className="text-3xl text-gray-600 mt-6">
            The most trusted English proficiency test.
          </h3>
        </div>

        {/* Content Section */}
        <div className="flex items-center gap-8 rounded-lg overflow-hidden">
          {/* Left Side (Image) */}
          <div className="w-1/2">
            <img
              src={card5}
              alt="Home Background"
              className="w-full h-full object-cover rounded-l-lg shadow-lg"
            />
          </div>

          {/* Right Side (Text & Button) */}
          <div className="w-1/2 p-6 flex flex-col justify-center">
            <h2 className="text-4xl font-bold mb-4 text-black">
              Prepare with Confidence
            </h2>
            <ul className="text-lg text-gray-700 list-disc pl-5 space-y-2">
              <li>Accepted by 12,500 organisations worldwide</li>
              <li>IELTS is the only major test to offer One Skill Retake</li>
            </ul>
            <button
              className="mt-6 px-5 py-2 bg-seagreen text-white font-semibold rounded-lg shadow-md cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
              onClick={goToTakeTest}
            >
              Practice test
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
