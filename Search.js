import axios from 'axios';
import React, { useState } from 'react';

function Search({ setWeatherData }) {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherDataState] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`);
      setWeatherDataState(response.data);
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;
