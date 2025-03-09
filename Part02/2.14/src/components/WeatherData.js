import { useState, useEffect } from 'react'
import axios from 'axios'

const WeatherData = ({ city }) => {
  const API_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_key}`)
      .then((response) => {setWeather(response.data)})
      .catch((error) => console.error(error))
  }, []);

  return (
    <>
      {weather.main ? (
        <div>
          <h2>Weather in {city}</h2>
          <div>temperature {weather.main.temp}°C</div>
          <img
            alt="weather icon"
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <div>wind {weather.wind.speed} m/s</div>
        </div>
      ) : null}
    </>
  );
}

export default WeatherData;