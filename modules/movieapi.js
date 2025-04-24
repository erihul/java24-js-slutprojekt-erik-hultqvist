// import { renderMoviePage } from "./render.js";
const BAERER_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOTg2NjU1ODMzNTI3YTA3MTcyMDQ2OWY2MzBkOTQxMSIsIm5iZiI6MTc0NDcyNjIzMC4xODcsInN1YiI6IjY3ZmU2OGQ2N2MyOWFlNWJjM2Q5YTJkMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyt24rZTWcXMoN-UI0JSI-jOKRQHvrxtaUjshXO_C70';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${BAERER_KEY}`
  }
};

async function getTop10RatedMovies() {
  const rateUrl =
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
  try {
    const response = await fetch(rateUrl, options);
    if (!response.ok) {
      throw new Error(
        "Sorry, we couldnt reach the movie database. Please try again later."
      );
    }
    const movieObj = await response.json();
    return movieObj.results;
  } catch (error) {
    throw error;
  }
}
async function getTop10PopularMovies() {
    const popUrl = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    try{
        const response = await fetch(popUrl, options);
        if(!response.ok) {
            throw new Error('Sorry, we couldnt reach the movie database. Please try again later.');
        }
        const movieObj = await response.json();
        return movieObj.results;
    } catch (error) {
        throw error;
    }
}
async function getSearchResult(searchCategory, searchInput, searchSorting) {
    const searchUrl = `https://api.themoviedb.org/3/search/${searchCategory}?query=${encodeURIComponent(searchInput)}&language=en-US&page=1`;
    try{
      const response = await fetch(searchUrl, options);
      if(!response.ok) {
        throw new Error('Sorry, we couldnt reach the movie database. Please try again later.');
    }
      const searchObj = await response.json();
        // console.log(searchObj);
      return searchObj.results;
  } catch (error) {
      throw error;
  }
}
async function getMovieById(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch movie details');
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
  async function getMovieTrailers(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch trailers');
      const data = await response.json();
      return data.results;
    } catch (error) {
      throw error;
    }
  }
  async function getMovieCredits(id) {
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    try {
      const response = await fetch(url, options);
      if (!response.ok) throw new Error('Failed to fetch credits');
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

export {getTop10RatedMovies, getTop10PopularMovies, getSearchResult, getMovieById, getMovieTrailers, getMovieCredits};