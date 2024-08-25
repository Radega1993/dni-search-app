import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

function ResultPage({ csvData }) {
  const { dni } = useParams();
  const location = useLocation();
  const personData = csvData.find((row) => row.DNI === dni);

  const isValidAccess = location.state && location.state.fromSearch;

  if (!isValidAccess || !personData) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-xl mb-6">DNI not found</p>
        <Link 
          to="/" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Person Details</h1>
      <ul className="space-y-2 mb-6">
        {Object.entries(personData).map(([key, value]) => (
          <li key={key} className="flex">
            <strong className="w-1/3 font-semibold">{key}:</strong>
            <span className="w-2/3">{value}</span>
          </li>
        ))}
      </ul>
      <div className="text-center">
        <Link 
          to="/" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Back to Search
        </Link>
      </div>
    </div>
  );
}

export default ResultPage;