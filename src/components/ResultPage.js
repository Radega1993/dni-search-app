import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

function ResultPage({ playersData, teamsData }) {
  const { dni } = useParams();
  const location = useLocation();
  const playerData = playersData.find((row) => row.NIF === dni);
  const isValidAccess = location.state && location.state.fromSearch;

  const locationLegend = `
PAV = Complex Esportiu Municipal Can Casablanques - Carrer del Priorat, s/n, 08192 Sant Quirze del Vallès, Barcelona

PURI = Gimnas Escuela Purificació Salas i Xandri - Ronda d'Arraona, s/n, 08192 Sant Quirze del Vallès, Barcelona

IES = Instituto público Sant Quirze del Vallés - Carrer del Bages, 21, 08192 Sant Quirze del Vallès, Barcelona

FERRAN SABADELL = IES Ferran Casablancas - Carrer Mare de les Aigües, 2, 08206 Sabadell, Barcelona
  `;

  if (!isValidAccess || !playerData) {
    return (
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-xl mb-6">DNI no trobat, envia email a info@voleisantquirze.cat</p>
        <Link 
          to="/" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Tornar a buscar
        </Link>
      </div>
    );
  }

  const teamData = teamsData.find((row) => row.EQUIPO === playerData['Equip assignat']);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Detalls del jugador</h1>
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold">Indormació personal</h2>
        <ul className="space-y-2">
          {Object.entries(playerData).map(([key, value]) => (
            <li key={key} className="flex">
              <strong className="w-1/3 font-semibold">{key}:</strong>
              <span className="w-2/3">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      {teamData && (
        <div className="space-y-4 mb-8">
          <h2 className="text-2xl font-semibold">Informació d'equip</h2>
          <ul className="space-y-2">
            <li className="flex">
              <strong className="w-1/3 font-semibold">Entrenador:</strong>
              <span className="w-2/3">{teamData.ENTRENADOR}</span>
            </li>
            <li className="flex">
              <strong className="w-1/3 font-semibold">Horari entrenament:</strong>
              <span className="w-2/3">{teamData['Dias y horarios de entrenamiento']}</span>
            </li>
          </ul>
        </div>
      )}
      <div className="space-y-4 mb-8">
        <h2 className="text-2xl font-semibold">Ubicacions </h2>
        <pre className="whitespace-pre-wrap text-sm">{locationLegend}</pre>
      </div>
      <div className="text-center">
        <Link 
          to="/" 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Tornar a buscar
        </Link>
      </div>
    </div>
  );
}

export default ResultPage;