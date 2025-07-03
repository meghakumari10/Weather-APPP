import React from 'react';

function Weather({ data }) {
  const { name, main, weather } = data;

  return (
    <div className="weather-box">
      <h2>{name}</h2>
      <p>{main.temp}°C</p>
      <p>{weather[0].description}</p>
      <img
        src={`https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
        alt="weather icon"
      />
    </div>
  );
}

export default Weather;