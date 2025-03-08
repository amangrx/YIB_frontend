import React from "react";

const CustomButton = ({ text, icon: Icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-white text-seagreen font-bold py-2 px-4 rounded-md hover:bg-gray-200 cursor-pointer hover:-translate-y-1 transition-all duration-300"
    >
      <Icon className="text-lg" /> 
      {text}
    </button>
  );
};

export default CustomButton;
