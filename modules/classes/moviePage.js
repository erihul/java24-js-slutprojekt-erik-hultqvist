import { MovieCard } from "./movieCard.js";

export class MoviePage extends MovieCard {
    constructor (movie, options = {}) {
        super(movie, { ...options, detailed: true });
        this.backdropPath = movie.backdrop_path;
        this.trailer = options.trailer;
        this.cast = options.cast ?? [];
        this.crew = options.crew ?? [];
    }

    render() {

        const moviePage = document.createElement('div');
        moviePage.classList.add('moviePage');

        const imgEl = document.createElement('img');
        imgEl.src = 'https://image.tmdb.org/t/p/w780' + this.backdropPath;
        imgEl.alt = `poster for ${this.title} was not found`;

        const titleEl = document.createElement('h3');
        titleEl.innerText = this.title;

        const releaseEl = document.createElement('p');
        releaseEl.innerText = 'Release date: ' + this.releaseDate;

        const descriptionEl = document.createElement('p');
        descriptionEl.innerText = this.overview;

        const scoreEl = document.createElement('p');
        scoreEl.innerText = 'User score: ' + this.voteAverage;
      
        const popEl = document.createElement('p');
        popEl.innerText = 'Popularity: ' + this.popularity;

        moviePage.append(imgEl, titleEl, releaseEl, descriptionEl, scoreEl, popEl)

        if (this.trailer) {
            const trailerEl = document.createElement('div');
            trailerEl.innerHTML = `
                <h3>Trailer</h3>
                <iframe width="560" height="315"
                src="https://www.youtube.com/embed/${this.trailer.key}"
                frameborder="0" allowfullscreen></iframe>`;
                moviePage.append(trailerEl);
        }

        if (this.cast.length) {
            const castEl = document.createElement('div');
            castEl.innerHTML = '<h3>Cast</h3>';
            this.cast.slice(0, 5).forEach(actor => {
                const actorEl = document.createElement('p');
                actorEl.innerText = `${actor.name} as ${actor.character}`;
                castEl.appendChild(actorEl);
            });
            moviePage.append(castEl);
        }

        if (this.crew.length) {
            const crewEl = document.createElement('div');
            crewEl.innerHTML = '<h3>Crew</h3>';
            const director = this.crew.find(person => person.job === 'Director');
            if (director) {
                const directorEl = document.createElement('p');
                directorEl.innerText = `Director: ${director.name}`;
                crewEl.appendChild(directorEl);
            }
            moviePage.append(crewEl);
        }

        return moviePage;
    }
}