// src/components/common/Card.jsx
import React from 'react';

export const Card = ({ 
  title, 
  children, 
  icon, 
  className = '', 
  titleClassName = '', 
  bodyClassName = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className={`px-6 py-4 border-b border-gray-100 ${titleClassName}`}>
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            {icon && <span className="mr-2">{icon}</span>}
            {title}
          </h3>
        </div>
      )}
      <div className={`px-6 py-4 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};
