import { renderMoviePage } from "../render.js";

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
      card.classList.add(this.detailed ? 'moviePage' : 'movieCard');
  
      if (this.index !== undefined) {
        const numEl = document.createElement('h1');
        numEl.innerText = this.index + 1;
        card.appendChild(numEl);
      }
  
      const imgEl = document.createElement('img');
      if (this.detailed && this.backdropPath) {
        imgEl.src = 'https://image.tmdb.org/t/p/w780' + this.backdropPath;
        imgEl.alt = `poster for ${this.title} was not found`;
      } else {
        imgEl.src = 'https://image.tmdb.org/t/p/w500' + this.posterPath;
        imgEl.alt = `poster for ${this.title} was not found`;
      }
      const titleEl = document.createElement('h3');
      titleEl.innerText = this.title;
  
      const releaseEl = document.createElement('p');
      releaseEl.innerText = 'Release date: ' + this.releaseDate;
  
      const scoreEl = document.createElement('p');
      scoreEl.innerText = 'User score: ' + this.voteAverage;
      
      const popEl = document.createElement('p');
      popEl.innerText = 'Popularity: ' + this.popularity;
  
      card.append(imgEl, titleEl, releaseEl);
  
      if (this.showDescription && this.overview) {
        const descriptionEl = document.createElement('p');
        descriptionEl.innerText = this.overview;
        card.append(descriptionEl);
      }
  
      card.append(scoreEl, popEl);
  
      // Show trailer
      if (this.detailed && this.trailer) {
        const trailerEl = document.createElement('div');
        trailerEl.innerHTML = `
          <h3>Trailer</h3>
          <iframe width="560" height="315"
            src="https://www.youtube.com/embed/${this.trailer.key}"
            frameborder="0" allowfullscreen></iframe>`;
        card.append(trailerEl);
      }
  
      // Show cast
      if (this.detailed && this.cast.length) {
        const castEl = document.createElement('div');
        castEl.innerHTML = '<h3>Cast</h3>';
        this.cast.slice(0, 5).forEach(actor => {
          const actorEl = document.createElement('p');
          actorEl.innerText = `${actor.name} as ${actor.character}`;
          castEl.appendChild(actorEl);
        });
        card.append(castEl);
      }
  
      // Show crew
      if (this.detailed && this.crew.length) {
        const crewEl = document.createElement('div');
        crewEl.innerHTML = '<h3>Crew</h3>';
        const director = this.crew.find(person => person.job === 'Director');
        if (director) {
          const directorEl = document.createElement('p');
          directorEl.innerText = `Director: ${director.name}`;
          crewEl.appendChild(directorEl);
        }
        card.append(crewEl);
      }
  
      // Prevent infinite re-render on click
      if (!this.detailed) {
        card.addEventListener('click', () => {
          renderMoviePage(this.id);
        });
      }
  
      return card;
    }

  }