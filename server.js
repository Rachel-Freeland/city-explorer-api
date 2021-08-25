'use strict';

//------------------------Dependencies--------------------------
const express = require('express');
const cors = require('cors');
const weatherData = require('./data/weather.json');

//--------------------------Configs-----------------------------
const app = express();
app.use(cors());

// import and config the dotenv
require('dotenv').config();

// designate the port
const PORT = process.env.PORT || 3002;

//--------------------------Routes------------------------------
// Set up the root/primary route
app.get('/', (req, res) => {
  res.send('Welcome to the dark side!');
})

// Route for the weather data
app.get('/weather', (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let searchQuery = req.query.searchQuery;
  let cityWeather = weatherData.find(city => city.city_name === searchQuery);
  console.log(cityWeather);

  if(cityWeather === undefined) {
    res.status(500).send('Error - City not supported')
  } else {
    let styledWeather = cityWeather.data.map( obj => `${obj.datetime}: High of ${obj.high_temp} and a low of ${obj.low_temp} with ${obj.weather.description}`);
    console.log(styledWeather);
    res.send(styledWeather);
  };
})

// Default route to catch any other routes that may be entered
app.get('/*', (req, res) => {
  res.status(404).send('This is NOT the page you are looking for.');
})

//----------------------Classes/Funcitons-----------------------

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    // this.description = obj.weather.description;
  }
}

//-------------------------Listening----------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
