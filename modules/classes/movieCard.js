// import { renderMoviePage } from "../render.js";

export class MovieCard {
    constructor(movie, options = {}) {
      this.id = movie.id;
      this.title = movie.title;
      this.releaseDate = movie.release_date;
      this.posterPath = movie.poster_path;
      this.backdropPath = movie.backdrop_path;
      this.overview = movie.overview;
      this.voteAverage = movie.vote_average;
      this.popularity = movie.popularity;
      this.index = options.index;
      this.showDescription = options.showDescription ?? true;
      this.detailed = options.detailed ?? false;
      this.trailer = options.trailer;
      this.cast = options.cast ?? [];
      this.crew = options.crew ?? [];
    }

    render() {
      const card = document.createElement('div');
      card.classList.add('movieCard');
      card.style.cursor = 'pointer';
      
      if (this.index !== undefined) {
        const numEl = document.createElement('h1');
        numEl.innerText = this.index + 1;
        card.appendChild(numEl);
      }
  
      const imgEl = document.createElement('img');
      imgEl.src = this.posterPath
      ? 'https://image.tmdb.org/t/p/w500' + this.posterPath
      : 'https://via.placeholder.com/500x750?text=No+Image';
      imgEl.alt = `poster for ${this.title} was not found`;
    
      const titleEl = document.createElement('h3');
      titleEl.innerText = this.title;
  
      const releaseEl = document.createElement('p');
      releaseEl.innerText = 'Release date: ' + this.releaseDate;
  
      card.append(imgEl, titleEl, releaseEl);
      
      if (this.showDescription && this.overview) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerText = this.overview;
        card.append(descriptionEl);
      }
      
      const scoreEl = document.createElement('p');
      scoreEl.innerText = 'User score: ' + this.voteAverage;
      
      const popEl = document.createElement('p');    
      popEl.innerText = 'Popularity: ' + this.popularity;
  
      card.append(scoreEl, popEl);

      card.dataset.id = this.id;
      card.dataset.type = 'movie';
      card.classList.add('clickable-card');
  
      return card;
    }

  }