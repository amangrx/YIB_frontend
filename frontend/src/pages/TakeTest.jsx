import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Dropdown from "../components/Dropdown";
import WritingTest from "../components/TestTypeList/WritingTest";
import ReadingListeningTest from "../components/TestTypeList/ReadingListeningTest";
import SpeakingTest from "../components/TestTypeList/SpeakingTest";

const TakeTest = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  const testTypes = [
    {
      id: "writing",
      label: "Writing Test",
      component: <WritingTest />,
    },
    {
      id: "reading_listening",
      label: "Reading & Listening Test",
      component: <ReadingListeningTest />,
    },
    {
      id: "speaking",
      label: "Speaking Test",
      component: <SpeakingTest />,
    },
  ];

  const handleTestSelect = (value) => {
    setSelectedTest(value);
  };

  const renderSelectedTest = () => {
    const test = testTypes.find((t) => t.id === selectedTest);
    return test ? test.component : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <div className="flex items-center gap-4 ml-1">
            <label className="text-lg font-medium text-gray-700 ml-12">
              Select the test you want to take:
            </label>
            <Dropdown
              options={testTypes.map((test) => ({
                value: test.id,
                label: test.label,
              }))}
              onSelect={(option) => handleTestSelect(option.value)}
              placeholder="Select Test Type"
              className="w-64"
            />
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          {selectedTest ? (
            renderSelectedTest()
          ) : (
            <div className="text-center py-12 px-4">
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">
                  Ready to Test Your Skills?
                </h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
                  <h4 className="text-lg font-medium text-blue-800 mb-4">
                    📝 Before You Begin
                  </h4>
                  <ul className="text-gray-600 space-y-3 text-left">
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Ensure you're in a quiet environment with minimal
                        distractions
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Have all necessary materials ready (pen, paper,
                        headphones if needed)
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>Check your internet connection is stable</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2">•</span>
                      <span>
                        Allocate enough time to complete the test without
                        interruption
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-blue-600 text-3xl mb-3">✍️</div>
                    <h4 className="font-medium mb-2">Writing Test</h4>
                    <p className="text-sm text-gray-500">
                      Assesses your ability to express ideas clearly and
                      coherently
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-green-600 text-3xl mb-3">📖</div>
                    <h4 className="font-medium mb-2">Reading & Listening</h4>
                    <p className="text-sm text-gray-500">
                      Evaluates comprehension skills through texts and audio
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-purple-600 text-3xl mb-3">🎤</div>
                    <h4 className="font-medium mb-2">Speaking Test</h4>
                    <p className="text-sm text-gray-500">
                      Measures your pronunciation and verbal communication
                    </p>
                  </div>
                </div>

                <p className="mt-10 text-gray-500 italic">
                  Select a test type from the dropdown above to begin your
                  assessment
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
