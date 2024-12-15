import React, { useState } from 'react';
import WeatherIcon from './WeatherIcon';
import { WiThermometerExterior, WiThermometer } from 'react-icons/wi';

function Forecast({ forecastData, darkMode }) {
  const [selectedDay, setSelectedDay] = useState(null);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow-lg'}`}>
      <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
      <div className="space-y-2">
        {forecastData?.map((day, index) => (
          <div key={day.dt}>
            <div 
              onClick={() => setSelectedDay(selectedDay === index ? null : index)}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                darkMode 
                  ? 'hover:bg-gray-700' 
                  : 'hover:bg-gray-50'
              } ${
                selectedDay === index
                  ? darkMode 
                    ? 'bg-gray-700 ring-2 ring-blue-500' 
                    : 'bg-gray-50 ring-2 ring-blue-500'
                  : ''
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
                <div className="text-lg font-medium">{formatDate(day.dt)}</div>
                <div className="flex justify-center">
                  <WeatherIcon 
                    iconCode={day.weather[0].icon}
                    size="2.5em"
                    className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                  />
                </div>
                <div className="flex flex-row sm:flex-col items-center justify-center gap-4 sm:gap-1">
                  <div className="flex items-center gap-1">
                    <WiThermometer className={`text-xl ${darkMode ? 'text-red-400' : 'text-red-500'}`} />
                    <span className="font-medium text-lg">
                      {Math.round(day.temp.max)}°
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <WiThermometerExterior className={`text-xl ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                    <span className={`font-medium text-lg ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {Math.round(day.temp.min)}°
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {day.weather[0].description}
                  </div>
                  {day.pop > 0 && (
                    <div className={`text-sm ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      {Math.round(day.pop * 100)}%
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Hourly Forecast Dropdown */}
            <div 
              className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                selectedDay === index 
                  ? 'max-h-[400px] opacity-100' 
                  : 'max-h-0 opacity-0'
              }`}
            >
              <div className={`p-4 rounded-lg ${
                darkMode ? 'bg-gray-700' : 'bg-gray-50'
              }`}>
                <h3 className="font-medium mb-3">Hourly Forecast</h3>
                <div className="overflow-x-auto">
                  <div className="flex gap-3 pb-2">
                    {day.hourly?.slice(0, 8).map((hour) => (
                      <div 
                        key={hour.dt} 
                        className={`flex-none w-24 p-3 rounded-lg text-center ${
                          darkMode ? 'bg-gray-600' : 'bg-white'
                        }`}
                      >
                        <div className="font-medium mb-1">{formatTime(hour.dt)}</div>
                        <div className="flex justify-center">
                          <WeatherIcon 
                            iconCode={hour.weather[0].icon}
                            size="2em"
                            className={`${darkMode ? 'text-blue-400' : 'text-blue-600'}`}
                          />
                        </div>
                        <div className="font-medium mt-1">{Math.round(hour.main.temp)}°C</div>
                        {hour.pop > 0 && (
                          <div className={`text-sm ${
                            darkMode ? 'text-blue-400' : 'text-blue-600'
                          }`}>
                            {Math.round(hour.pop * 100)}%
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
