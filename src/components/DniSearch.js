import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DniSearch({ playersData }) {
  const [dni, setDni] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = playersData.some((row) => row.NIF === dni);
    if (found) {
      navigate(`/result/${dni}`, { state: { fromSearch: true } });
    } else {
      alert('DNI no trobat, envia email a info@voleisantquirze.cat.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Vòlei Sant Quirze</h1>
      <h3 className="text-xl font-bold mb-6 text-center text-gray-800">A quin equip jugaré?</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          placeholder="Enter DNI"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}

export default DniSearch;