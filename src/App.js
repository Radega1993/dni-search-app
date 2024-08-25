import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Papa from 'papaparse';
import DniSearch from './components/DniSearch';
import ResultPage from './components/ResultPage';
import csvFile from './data/data.csv';

function App() {
  const [csvData, setCsvData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvFile);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setCsvData(results.data);
        },
      });
    };

    fetchData();
  }, []);

  return (
    <Router>
      <div className="App min-h-screen bg-gray-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <Routes>
            <Route path="/" element={<DniSearch csvData={csvData} />} />
            <Route path="/result/:dni" element={<ResultPage csvData={csvData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;