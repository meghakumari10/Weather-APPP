import React from 'react';

function Forecast({ data }) {
  // Filter one forecast per day (12:00 PM entries)
  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes('12:00:00')
  );

  return (
    <div className="forecast">
      <h2>5-Day Forecast</h2>
      <div className="forecast-grid">
        {dailyForecasts.map((item, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(item.dt_txt).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="weather icon"
            />
            <p>{item.main.temp}°C</p>
            <p>{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
