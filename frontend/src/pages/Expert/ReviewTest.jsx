import React, { useState } from 'react'
import Sidebar from '../../components/SideBar'
import Dropdown from '../../components/Dropdown'
import WritingReview from '../../components/ReviewTest/ReviewWritingTest'
import ReadingListeningReview from '../../components/ReviewTest/ReviewReadAndListeningTest'

const ReviewTest = () => {
  const [selectedTest, setSelectedTest] = useState(null)

  const testTypes = [
    {
      id: 'writing',
      label: 'Writing Test Review',
      component: <WritingReview />,
      description: 'Review your writing test results and feedback',
      icon: '✍️'
    },
    {
      id: 'reading-listening',
      label: 'Reading/Listening Test Review',
      component: <ReadingListeningReview />,
      description: 'Review your reading and listening test results',
      icon: '📖'
    }
  ]

  const handleTestSelect = (value) => {
    setSelectedTest(value)
  }

  const renderSelectedTest = () => {
    const test = testTypes.find(t => t.id === selectedTest)
    return test ? test.component : null
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed h-full">
        <Sidebar />
      </div>
      
      {/* Main content area with left margin equal to sidebar width */}
      <div className="flex-1 ml-64 pl-8"> {/* Adjust ml-64 to match your sidebar width */}
        <div className="container mx-auto px-4 py-8">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Review Your Test Results</h1>
            <div className="flex items-center gap-4">
              <label className="text-lg font-medium text-gray-700">
                Select the test you want to review:
              </label>
              <Dropdown
                options={testTypes.map(test => ({
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
                    Review Customer Performance
                  </h3>
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-medium text-blue-800 mb-4">
                      📝 What You Can Review
                    </h4>
                    <ul className="text-gray-600 space-y-3 text-left">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          Detailed feedback on  test performance
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          Correct answers and explanations
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>Areas for improvement</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          Score breakdown and assessment criteria
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mt-8">
                    {testTypes.map((test) => (
                      <div 
                        key={test.id}
                        className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => handleTestSelect(test.id)}
                      >
                        <div className="text-blue-600 text-3xl mb-3">{test.icon}</div>
                        <h4 className="font-medium mb-2">{test.label}</h4>
                        <p className="text-sm text-gray-500">
                          {test.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <p className="mt-10 text-gray-500 italic">
                    Select a test type from the dropdown or click on a test card above to review results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReviewTest