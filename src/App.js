import React, { useState, useEffect } from 'react';
import Weather from './Weather';
import Forecast from './Forecast';
import { Circles } from 'react-loader-spinner';
import './index.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_KEY = 'fe419969cef44122fe91d74e51878412'; // 🔑 Replace with your API key

  const fetchWeather = async () => {
    if (!city) return;

    try {
      setLoading(true);
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!currentRes.ok || !forecastRes.ok) {
        throw new Error('City not found');
      }

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      setWeatherData(currentData);
      setForecastData(forecastData);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setForecastData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);

      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );

      if (!currentRes.ok || !forecastRes.ok) throw new Error('Location fetch failed');

      const currentData = await currentRes.json();
      const forecastData = await forecastRes.json();

      setWeatherData(currentData);
      setForecastData(forecastData);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setForecastData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Run only once on page load
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        (err) => {
          console.error(err);
          setError('Location access denied.');
        }
      );
    } else {
      setError('Geolocation not supported.');
    }
  }, []);

  return (
    <div className="app">
      <h1>Weather App</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Search</button>

      {error && <p className="error">{error}</p>}

      {loading && (
        <div style={{ marginTop: '20px' }}>
          <Circles height={80} width={80} color="blue" />
        </div>
      )}

      {!loading && weatherData && <Weather data={weatherData} />}
      {!loading && forecastData && <Forecast data={forecastData} />}
    </div>
  );
}

export default App;
