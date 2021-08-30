const axios = require('axios');

async function getMovies (req, res) {
  let city = req.query.searchQuery;
  const moviesAPI = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&language=en-US&query=${city}&page=1&include_adult=false`;
  try{
    const moviesRes = await axios.get(moviesAPI);
    const moviesResData = moviesRes.data.results.map( obj => new MovieInfo(obj));
    res.status(200).send(moviesResData);
  } catch {
    res.status(500).send('Houston, we have an problem!');
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

module.exports = getMovies;