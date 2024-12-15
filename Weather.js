import React from 'react';

function Weather({ weatherData }) {
  return (
    <div>
      <h2>Current Weather</h2>
      {weatherData && (
        <div>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Condition: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
