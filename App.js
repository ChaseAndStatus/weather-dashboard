import React, { useState } from 'react';
import Search from './Search';
import Weather from './Weather';
import Forecast from './Forecast';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  return (
    <div className={darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}>
      <button onClick={() => setDarkMode(!darkMode)}>Toggle Dark Mode</button>
      <Search setWeatherData={setWeatherData} />
      <Weather weatherData={weatherData} />
      <Forecast />
    </div>
  );
}

export default App;
