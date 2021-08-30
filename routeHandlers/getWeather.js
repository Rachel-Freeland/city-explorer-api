'use strict';

const axios = require('axios');

async function getWeather (req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  const weatherAPI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`;
  try{
  const cityWeather = await axios.get(weatherAPI);
  const cityWeatherStyled = cityWeather.data.data.map( obj => new Forecast(obj));
  res.status(200).send(cityWeatherStyled);
  } catch {
    res.status(500).send('Server Error!');
  }
}

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
    this.dailyForecast = `High ${obj.high_temp}/Low ${obj.low_temp} with ${obj.weather.description}`;
  }
}

module.exports = getWeather;