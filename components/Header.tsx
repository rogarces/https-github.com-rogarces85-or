import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 md:px-8 py-3 flex items-center justify-between">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9 text-red-600 mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 2.1l-2.1 4.2-3.4 1.2-3.9 3.9-1.3 1.3-2.1-2.1 1.3-1.3 3.9-3.9 1.2-3.4 4.2-2.1z"></path>
                <path d="M7.2 13.8l-2.1-2.1-1.3 1.3 3.9 3.9 1.3 1.3 2.1-2.1-1.3-1.3-3.9-3.9z"></path>
                <path d="M12.5 5.5l-1.5 1.5"></path>
                <path d="M15 8l-1.5 1.5"></path>
                <circle cx="12" cy="12" r="10"></circle>
            </svg>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-wider uppercase">
            <span className="text-red-600">Osorno</span> Runner IA
            </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;