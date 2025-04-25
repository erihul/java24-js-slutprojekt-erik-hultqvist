// MOVIECARD.JS -- Defines a MovieCard class to create and render movie summary cards (for both top10 lists and in search)
//                 using OOP.


export class MovieCard {
    constructor(movie, options = {}) {
      this.id = movie.id;
      this.title = movie.title;
      this.releaseDate = movie.release_date;
      this.posterPath = movie.poster_path;
      this.overview = movie.overview;
      this.voteAverage = movie.vote_average;
      this.popularity = movie.popularity;
      this.index = options.index;
      this.showDescription = options.showDescription ?? true;
      this.detailed = options.detailed ?? false;
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
      ? 'https://image.tmdb.org/t/p/original' + this.posterPath
      : 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    
      const titleEl = document.createElement('h3');
      titleEl.innerText = this.title;
  
      const releaseEl = document.createElement('h6');
      releaseEl.innerText = 'Release date: ' + this.releaseDate;
  
      card.append(imgEl, titleEl, releaseEl);
      
      if (this.showDescription && this.overview) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerText = this.overview;
        card.append(descriptionEl);
      }
      
      const scoreEl = document.createElement('h6');
      scoreEl.innerText = 'User score: ' + this.voteAverage;
      
      const popEl = document.createElement('h6');    
      popEl.innerText = 'Popularity: ' + this.popularity;
  
      card.append(scoreEl, popEl);

      card.dataset.id = this.id;
      card.dataset.type = 'movie';
      card.classList.add('clickable-card');
  
      return card;
    }

  }