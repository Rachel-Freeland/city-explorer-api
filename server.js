'use strict';

//------------------------Dependencies--------------------------
const express = require('express');
const cors = require('cors');
const axios = require('axios');

//--------------------------Configs-----------------------------

// import and config the dotenv
require('dotenv').config();

const app = express();
app.use(cors());

// designate the port
const PORT = process.env.PORT || 3002;

//--------------------------Routes------------------------------
// Set up the root/primary route
app.get('/', (req, res) => {
  res.send('Welcome to the dark side!');
})

// Route for the weather data
app.get('/weather', getWeather);
  
// Route for movies
app.get('/movies', getMovies);

// Default route to catch any other routes that may be entered
app.get('/*', (req, res) => {
  res.status(404).send('This is NOT the page you are looking for.');
})

//----------------------Classes/Funcitons-----------------------
async function getWeather (req, res) {
  let lat = req.query.lat;
  let lon = req.query.lon;
  const weatherAPI = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}&units=I`;
  try{
  const cityWeather = await axios.get(weatherAPI);
  const cityWeatherStyled = cityWeather.data.data.map( obj => new Forecast(obj));
  res.send(cityWeatherStyled);
  } catch {
    res.status(500).send('Server Error!');
  }
}

async function getMovies (req, res) {
  let city = req.query.searchQuery;
  const moviesAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
  try{
    const moviesRes = await axios.get(moviesAPI);
    const moviesResData = moviesRes.data.results.map( obj => new MovieInfo(obj));
    console.log(moviesResData);
    res.send(moviesResData);
  } catch {
    res.status(500).send('Houston, we have an error!');
  }
}

class Forecast {
  constructor(obj) {
    this.date = obj.datetime;
    this.description = obj.weather.description;
    this.dailyForecast = `${obj.datetime}: High ${obj.high_temp}/Low ${obj.low_temp} with ${obj.weather.description}`;
  }
}

class MovieInfo {
  constructor(obj){
    this.imgUrl = `https://image.tmdb.org/t/p/w200${obj.poster_path}`;
    this.title = obj.title;
    this.overview = obj.overview;
    this.release_date = obj.release_date;
    this.popularity = obj.popularity;
    this.totalVotes = obj.vote_count;
    this.vote_avg = obj.vote_average;
  }
};

//-------------------------Listening----------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
