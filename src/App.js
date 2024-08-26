import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Papa from 'papaparse';
import DniSearch from './components/DniSearch';
import ResultPage from './components/ResultPage';
import playersFile from './data/datajugadores.csv';
import teamsFile from './data/datahorarios.csv';

function App() {
  const [playersData, setPlayersData] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    const fetchData = async (file, setData) => {
      const response = await fetch(file);
      const reader = response.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder('utf-8');
      const csv = decoder.decode(result.value);
      
      Papa.parse(csv, {
        header: true,
        complete: (results) => {
          setData(results.data);
        },
      });
    };

    fetchData(playersFile, setPlayersData);
    fetchData(teamsFile, setTeamsData);
  }, []);

  return (
    <Router>
      <div className="App min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8">
        <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
          <Routes>
            <Route path="/" element={<DniSearch playersData={playersData} />} />
            <Route path="/result/:dni" element={<ResultPage playersData={playersData} teamsData={teamsData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;