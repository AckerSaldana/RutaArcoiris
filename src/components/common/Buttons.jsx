// src/components/common/Buttons.jsx
import React from 'react';

export const PrimaryButton = ({ text, icon, className, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 rounded-md text-white text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${className || 'bg-purple-600 hover:bg-purple-700'}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};

export const SecondaryButton = ({ text, icon, className, onClick, ...props }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${className || 'bg-white text-gray-700 hover:bg-gray-50'}`}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {text}
    </button>
  );
};