import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-dashed rounded-full animate-spin border-red-500"></div>
      <p className="mt-4 text-md text-gray-600">La IA está diseñando tu plan...</p>
      <p className="text-sm text-gray-400">Esto puede tardar unos segundos.</p>
    </div>
  );
};

export default Spinner;