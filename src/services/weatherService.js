import axios from 'axios';

const BASE_URL = 'https://api.openweathermap.org';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

// Create axios instance with default config
const weatherApi = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric'
  }
});

// Add request interceptor for error handling
weatherApi.interceptors.request.use(
  (config) => {
    // Validate required parameters
    if (!config.params?.appid) {
      throw new Error('API key is required');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
weatherApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const customError = {
      message: 'An error occurred while fetching weather data',
      status: error.response?.status || 500,
      originalError: error
    };

    if (error.response) {
      switch (error.response.status) {
        case 401:
          customError.message = 'Invalid API key';
          break;
        case 404:
          customError.message = 'Location not found';
          break;
        case 429:
          customError.message = 'Too many requests. Please try again later';
          break;
        default:
          customError.message = error.response.data?.message || customError.message;
      }
    } else if (error.request) {
      customError.message = 'Network error. Please check your connection';
    }

    return Promise.reject(customError);
  }
);

export const getCoordinates = async (searchTerm) => {
  try {
    const response = await weatherApi.get('/geo/1.0/direct', {
      params: {
        q: searchTerm,
        limit: 1
      }
    });
    return response.data[0] || null;
  } catch (error) {
    throw error;
  }
};

export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/data/2.5/weather', {
      params: { lat, lon }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getForecast = async (lat, lon) => {
  try {
    const response = await weatherApi.get('/data/2.5/forecast', {
      params: { lat, lon }
    });
    
    // Process forecast data
    const dailyMap = new Map();
    
    response.data.list.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyMap.has(date)) {
        dailyMap.set(date, {
          dt: item.dt,
          temp: {
            min: item.main.temp,
            max: item.main.temp
          },
          weather: item.weather,
          pop: item.pop,
          hourly: [item]
        });
      } else {
        const existing = dailyMap.get(date);
        existing.temp.min = Math.min(existing.temp.min, item.main.temp);
        existing.temp.max = Math.max(existing.temp.max, item.main.temp);
        existing.pop = Math.max(existing.pop, item.pop);
        existing.hourly.push(item);
      }
    });

    const processedForecast = Array.from(dailyMap.values());
    return {
      daily: processedForecast.slice(0, 5),
      hourly: response.data.list.slice(0, 8)
    };
  } catch (error) {
    throw error;
  }
};
