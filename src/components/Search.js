import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

function Search({ onSearch, darkMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const fetchedSuggestions = await fetchSuggestions(value);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setSearchTerm('');
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    // Replace with your API endpoint for fetching location suggestions
    const response = await fetch(`YOUR_API_URL?q=${query}`);
    const data = await response.json();
    return data.suggestions; // Adjust based on your API response structure
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search for a city..."
          className={`w-full p-4 pr-12 rounded-lg outline-none transition-colors ${
            darkMode
              ? 'bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500'
              : 'bg-white text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-600'
          }`}
        />
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white border border-gray-300 w-full">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => onSearch(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
