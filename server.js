'use strict';

//------------------------Dependencies--------------------------
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const getWeather = require('./routeHandlers/getWeather.js');
const getMovies = require('./routeHandlers/getMovies.js');
const getNotFound = require('./routeHandlers/getNotFound.js');

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
app.get('/*', getNotFound);

//-------------------------Listening----------------------------
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
