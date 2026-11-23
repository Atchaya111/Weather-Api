
import { useState } from 'react';

function App() {

  const [weather, setWeather] = useState(null);

  function getWeather() {

    fetch('https://geocoding-api.open-meteo.com/v1/search?name=Chennai&count=1')
      .then(response => response.json())
      .then(data => {

        const city = data.results[0];

        return fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`
        );

      })
      .then(response => response.json())
      .then(data => {
        setWeather(data.current);
      })
      .catch(error => {
        console.log("Error:", error);
      });

  }

  return (
    <div>

      <h1>Weather Details</h1>

      <button onClick={getWeather}>
        Get Weather
      </button>

      {weather && (
        <div>

          <h3>Chennai Weather</h3>

          <p>Temperature: {weather.temperature_2m} °C</p>

          <p>Humidity: {weather.relative_humidity_2m} %</p>

          <p>Wind Speed: {weather.wind_speed_10m} km/h</p>

        </div>
      )}

    </div>
  );
}

export default App;
