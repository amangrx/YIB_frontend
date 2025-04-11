import React, { useState } from 'react';
// import ReactQuill from 'react-quill'; // import ReactQuill
// import 'react-quill/dist/quill.snow.css'; // import the required CSS

// You can customize the modules and formats if needed
const modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['link'],
    ['clean'] // the 'clean' button will clear all content
  ],
};

const formats = [
  'header', 'font', 'list', 'bold', 'italic', 'underline', 'align', 'link'
];

const WritingTest = () => {
  const [content, setContent] = useState(''); // to store the content of the writing test

  // Handle change of the Quill editor content
  const handleChange = (value) => {
    setContent(value);
  };

  // Handle submission of the test
  const handleSubmit = () => {
    console.log('Submitted content:', content);
    // Here you can send the content to your backend or process it as needed
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">IELTS Writing Test</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Write your response to the task below:
      </p>

      <div className="task-container mb-8">
        <h2 className="text-2xl font-semibold mb-2">Writing Task 1:</h2>
        <p className="text-lg text-gray-600">
          The graph below shows the number of commuters in a city using different forms of transport over a 10-year period.
        </p>
      </div>

      <ReactQuill
        value={content}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        placeholder="Write your answer here..."
        style={{ height: '300px', marginBottom: '20px' }}
      />

      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default WritingTest;
