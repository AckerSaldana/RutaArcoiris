// src/components/common/LanguageSelector.jsx
import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSelector = ({ className = '', minimal = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('es');
  
  const languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
    { code: 'pt', name: 'Português' },
  ];
  
  const getCurrentLanguage = () => {
    return languages.find(lang => lang.code === language);
  };
  
  const handleLanguageChange = (code) => {
    setLanguage(code);
    setIsOpen(false);
  };
  
  if (minimal) {
    return (
      <button
        className={`p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none ${className}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={20} />
      </button>
    );
  }
  
  return (
    <div className={`relative ${className}`}>
      <button
        className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-100 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe size={16} />
        <span>{getCurrentLanguage().name}</span>
        <ChevronDown size={14} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                lang.code === language ? 'text-purple-600 font-medium' : 'text-gray-700'
              }`}
              onClick={() => handleLanguageChange(lang.code)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};