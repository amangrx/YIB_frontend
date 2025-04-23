import React from "react";

const FileUploadInput = ({ id, label, onChange, accept, file, required = false }) => {
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Create a proper event structure that matches what the parent expects
      const syntheticEvent = {
        target: {
          name: id,  // Use the id as the field name
          value: e.target.files[0], // For consistency with other inputs
          files: e.target.files     // Also provide the files array
        }
      };
      onChange(syntheticEvent);
    }
  };

  const getFileTypeIcon = () => {
    if (accept === ".pdf") {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
        />
      );
    }
    if (accept.includes("audio")) {
      return (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
        />
      );
    }
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    );
  };

  const getFileTypeText = () => {
    if (accept === ".pdf") return "PDF file";
    if (accept.includes("audio")) return "Audio file";
    return "File";
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-base font-medium py-2" htmlFor={id}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col w-full border-2 border-dashed border-gray-300 hover:border-seagreen hover:bg-gray-50 rounded-lg cursor-pointer transition-all duration-200">
          <div className="flex flex-col items-center justify-center pt-5 pb-6 px-4">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {getFileTypeIcon()}
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">
              {file ? file.name : `${getFileTypeText()}${required ? " (required)" : ""}`}
            </p>
          </div>
          <input
            id={id}
            type="file"
            onChange={handleFileChange}
            accept={accept}
            className="hidden"
            required={required}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUploadInput;