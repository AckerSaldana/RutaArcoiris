// src/components/ui/RainbowBar.jsx
import React from 'react';

export const RainbowBar = ({ height = 'h-1', className = '' }) => {
  return (
    <div className={`w-full ${height} bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-purple-500 ${className}`}></div>
  );
};