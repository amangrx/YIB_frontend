import React from "react";

const Card = ({ logo, title, description, onClick }) => {
  return (
    <div 
      className="max-w-sm bg-white rounded-lg shadow-md p-6 flex flex-col items-start border border-gray-200 cursor-pointer hover:shadow-lg hover:-translate-y-3 transition-all duration-300"
      onClick={onClick ? onClick : undefined}
    >
      <div className="w-10 h-10 mb-4">{logo}</div>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700 mb-4">{description}</p>
    </div>
  );
};

export default Card;
