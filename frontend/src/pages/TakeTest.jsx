import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Dropdown from '../components/Dropdown';
import WritingTest from "../components/TestTypeList/WritingTest";
import ReadingTest from "../components/TestTypeList/ReadingTest";
import ListeningTest from "../components/TestTypeList/ListeningTest";
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
      id: "reading",
      label: "Reading Test",
      component: <ReadingTest />,
    },
    {
      id: "listening",
      label: "Listening Test",
      component: <ListeningTest />,
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
    const test = testTypes.find(t => t.id === selectedTest);
    return test ? test.component : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-12">Take a Test</h1>
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
            <div className="text-center text-gray-500 py-12">
              Please select a test type from the dropdown
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TakeTest;
