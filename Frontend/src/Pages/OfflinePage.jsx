import React from 'react';
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa';

const OfflinePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center max-w-md w-full">
        <div className="flex justify-center mb-6">
          <FaWifi className="text-red-500 text-6xl" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">No Internet Connection</h1>
        <p className="text-gray-600 mb-6">Please check your network and try again.</p>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <h3 className="text-lg font-semibold text-yellow-700 mb-4">Troubleshooting Tips:</h3>
          <ul className="space-y-2">
            <li className="flex items-center text-yellow-800">
              <FaExclamationTriangle className="mr-2 text-yellow-600" />
              Check your Wi-Fi or mobile data connection
            </li>
            <li className="flex items-center text-yellow-800">
              <FaExclamationTriangle className="mr-2 text-yellow-600" />
              Restart your router or modem
            </li>
            <li className="flex items-center text-yellow-800">
              <FaExclamationTriangle className="mr-2 text-yellow-600" />
              Move closer to your Wi-Fi source
            </li>
          </ul>
        </div>
        
        <button 
          onClick={() => window.location.reload()}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Retry Connection
        </button>
      </div>
    </div>
  );
};

export default OfflinePage;