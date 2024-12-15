import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function Search({ onSearch, darkMode }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a city..."
          className={`w-full p-4 pr-12 rounded-lg outline-none transition-colors ${
            darkMode
              ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
              : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-600'
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
            darkMode
              ? 'text-gray-400 hover:text-white hover:bg-gray-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <FiSearch className="w-5 h-5" />
        </button>
      </div>
    </form>
  );
}

export default Search;