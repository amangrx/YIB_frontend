import React, { useState } from 'react'
import Sidebar from '../../components/SideBar'
import Dropdown from '../../components/Dropdown' 

// Import your test review pages (create these if they don't exist yet)
import WritingReview from '../../components/ReviewTest/ReviewWritingTest'
import ReadingListeningReview from '../../components/ReviewTest/ReviewReadAndListeningTest'

const ReviewTest = () => {
  const [selectedTest, setSelectedTest] = useState(null)

  const testOptions = [
    { value: 'writing', label: 'Writing' },
    { value: 'reading-listening', label: 'Reading/Listening' }
  ]

  const handleTestSelect = (option) => {
    setSelectedTest(option)
    console.log('Selected test:', option)
  }

  const renderSelectedTestPage = () => {
    if (!selectedTest) return null

    switch (selectedTest.value) {
      case 'writing':
        return <WritingReview />
      case 'reading-listening':
        return <ReadingListeningReview />
      default:
        return null
    }
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-gray-800">
              Select a test type to review
            </h1>
            <div className="w-64">
              <Dropdown
                options={testOptions}
                onSelect={handleTestSelect}
                placeholder="Select test type..."
              />
            </div>
          </div>

          {/* Dynamically render the selected test component here */}
          {renderSelectedTestPage()}
          
        </div>
      </div>
    </div>
  )
}

export default ReviewTest
