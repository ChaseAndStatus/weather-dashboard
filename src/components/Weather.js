import React from 'react';
import WeatherIcon from './WeatherIcon';
import { WiSunrise, WiSunset, WiStrongWind, WiHumidity, WiThermometer, WiBarometer } from 'react-icons/wi';

function Weather({ weatherData, darkMode }) {
  if (!weatherData?.current) return null;

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const current = weatherData.current;

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}> 
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"> 
        <div> 
          <h2 className="text-3xl font-bold mb-1">{current.name}</h2> 
          <div className="text-5xl font-bold mb-4"> 
            {Math.round(current.main.temp)}°C 
          </div> 
          <div className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}> 
            {current.weather[0].description} 
          </div> 
        </div> 

        <div className="flex items-center justify-center w-full md:w-auto"> 
          <WeatherIcon 
            iconCode={current.weather[0].icon} 
            size="6em" 
            className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`} 
          /> 
        </div> 

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 w-full md:w-auto"> 
          <div className="flex items-center gap-2"> 
            <WiThermometer className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} /> 
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Feels like: </span> 
            <span className="font-medium">{Math.round(current.main.feels_like)}°C</span> 
          </div> 
          <div className="flex items-center gap-2">
            <WiHumidity className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Humidity: </span>
            <span className="font-medium">{current.main.humidity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <WiStrongWind className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Wind: </span>
            <span className="font-medium">{Math.round(current.wind.speed)} m/s</span>
          </div>
          <div className="flex items-center gap-2">
            <WiBarometer className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pressure: </span>
            <span className="font-medium">{current.main.pressure} hPa</span>
          </div>
          <div className="flex items-center gap-2">
            <WiSunrise className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sunrise: </span>
            <span className="font-medium">{formatTime(current.sys.sunrise)}</span>
          </div>
          <div className="flex items-center gap-2">
            <WiSunset className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
            <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sunset: </span>
            <span className="font-medium">{formatTime(current.sys.sunset)}</span>
          </div>
        </div>
      </div>

      {weatherData.hourly && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Next 24 Hours</h3>
          <div className="overflow-x-auto">
            <div className="flex gap-4 pb-2">
              {weatherData.hourly.map((hour) => (
                <div 
                  key={hour.dt} 
                  className={`flex-none w-24 p-3 rounded-lg text-center ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}
                >
                  <div className="font-medium mb-1">{formatTime(hour.dt)}</div>
                  <div className="flex justify-center">
                    <WeatherIcon 
                      iconCode={hour.weather[0].icon}
                      size="2.5em"
                      className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                    />
                  </div>
                  <div className="font-medium">{Math.round(hour.main.temp)}°C</div>
                  {hour.pop > 0 && (
                    <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {Math.round(hour.pop * 100)}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
