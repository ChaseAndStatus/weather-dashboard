import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search';
import Weather from './components/Weather';
import Forecast from './components/Forecast';
import { getCoordinates, getCurrentWeather, getForecast } from './services/weatherService';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load London weather by default
    const loadDefaultWeather = async () => {
      try {
        setError(null);
        // Get London's coordinates
        const location = await getCoordinates('London,GB');
        
        if (location) {
          const { lat, lon } = location;
          const [currentWeather, forecast] = await Promise.all([
            getCurrentWeather(lat, lon),
            getForecast(lat, lon)
          ]);

          setWeatherData({
            current: currentWeather,
            ...forecast
          });
        }
      } catch (error) {
        setError(error.message);
        console.error('Error:', error);
      }
    };

    loadDefaultWeather();
  }, []); // Run once on component mount

  useEffect(() => {
    const loadDynamicTheme = async () => {
      if (weatherData) {
        const currentHour = new Date().getHours();
        const sunrise = new Date(weatherData.current.sys.sunrise * 1000).getHours();
        const sunset = new Date(weatherData.current.sys.sunset * 1000).getHours();

        // Set dark mode based on time
        if (currentHour >= sunrise && currentHour < sunset) {
          setDarkMode(false); // Light mode
        } else {
          setDarkMode(true); // Dark mode
        }
      }
    };

    loadDynamicTheme();
  }, [weatherData]);

  const handleSearch = async (searchTerm) => {
    try {
      setError(null);
      const location = await getCoordinates(searchTerm);

      if (location) {
        const { lat, lon } = location;
        const [currentWeather, forecast] = await Promise.all([
          getCurrentWeather(lat, lon),
          getForecast(lat, lon)
        ]);

        setWeatherData({
          current: currentWeather,
          ...forecast
        });
      } else {
        setError('Location not found');
      }
    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h1 className="text-3xl font-bold">Weather Dashboard</h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-700' 
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <Search onSearch={handleSearch} darkMode={darkMode} />
        {error && (
          <div className="p-4 bg-red-500 text-white rounded-lg">
            {error}
          </div>
        )}
        {weatherData && (
          <div className="space-y-6">
            <Weather weatherData={weatherData} darkMode={darkMode} />
            <Forecast forecastData={weatherData.daily} darkMode={darkMode} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
