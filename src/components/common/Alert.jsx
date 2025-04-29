// src/components/common/Alert.jsx
import React from 'react';

export const Alert = ({ 
  title, 
  children, 
  type = 'info', 
  icon, 
  className = '' 
}) => {
  const types = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200',
    purple: 'bg-purple-50 text-purple-800 border-purple-200',
  };
  
  return (
    <div className={`border rounded-md p-4 ${types[type]} ${className}`}>
      {title && (
        <h4 className="text-base font-medium mb-2 flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          {title}
        </h4>
      )}
      <div className="text-sm">
        {children}
      </div>
    </div>
  );
};