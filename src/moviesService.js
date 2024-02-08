// Import the axios library
const axios = require('axios')
const moviesList = require('../data/movies.json').movies

const getMovies = (done) => {
  // get all movies
  return JSON.stringify(moviesList)
}

const getMoviesById = (movieId, done) => {
  // get movie by id
  const movie = moviesList.find((movie)=> movie.id === parseInt(movieId))
  if(!movie){
    return done("movie does not exists",null)
  }
  done(null,JSON.stringify(movie))
}

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  const existingmovie = moviesList.find((movie)=> movie.id === newMovie.id)
  if(existingmovie){
    return done('Movie already exists',null);
  }
  const movieId = moviesList.length + 1
  const movie = {id : movieId,...newMovie};
  moviesList.push(movie);
  done(null,JSON.stringify(moviesList));
}

const updateMovie = function (movieId, updateData, done) {
 // update movie details of a specific 
 const index = moviesList.findIndex((movie)=>movie.id === parseInt(movieId))
 if(index === -1){
  return done('movie does not exist',null);
 }
 Object.assign(moviesList[index],updateData);
 done(null,JSON.stringify(moviesList));
}

const deleteMovieById = function (movieId, done) {
  // delete a specific movie 
  const index = moviesList.findIndex((movie)=> movie.id === parseInt(movie))
  if(index === -1){
    return done('movie does not exist', null);

  }
  moviesList.splice(index,1);
  done(null,JSON.stringify(moviesList));
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
