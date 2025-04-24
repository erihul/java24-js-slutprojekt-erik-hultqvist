import { MovieCard } from "./classes/movieCard.js";
import { PersonCard } from "./classes/personCard.js";
import { getMovieById, getMovieTrailers, getMovieCredits } from "./movieapi.js";

const searchElement = document.querySelector('#searchElement');
const contentWrapper = document.querySelector('#contentWrapper')
const searchInfo = document.querySelector('#searchInfo');
const listContent = document.querySelector('#listContent');
const movieContent = document.querySelector('#movieContent');

function showError(message) {
    console.log('showError är: ' + message)
    const errorEl = document.querySelector('#errorMessage');
    errorEl.innerText = message;
    errorEl.classList.remove('hidden');

    setTimeout(() => {
        errorEl.classList.add('hidden');
    }, 5000);
}
// Namnge tydligare  beskrivande
function renderTop(movieUrls){
    searchInfo.innerHTML = '';
    listContent.innerHTML = '';
    movieContent.innerHTML = '';
    searchElement.classList.add('hidden');
    
    movieUrls.slice(0, 10).forEach((movie, index) => {
        const card = new MovieCard(movie, { index, showDescription: false });
        listContent.append(card.render());
        console.log(movie);
      });

    requestAnimationFrame(() => {
        headerContent.scrollIntoView({
            behavior: 'smooth'
        });
    });
}

function renderSearchBar() {
    searchInfo.innerHTML = '';
    listContent.innerHTML = '';
    movieContent.innerHTML = '';
    headerContent.style.backgroundColor = 'var(--mmdbBlack)';
    headerContent.style.color = 'white';
    searchElement.classList.remove('hidden');
}

function renderSearchResult(searchUrls, searchCategory, searchSortingText) {
    searchInfo.innerHTML = '';
    listContent.innerHTML = '';
    movieContent.innerHTML = '';
    headerContent.scrollIntoView();

    const searchTitle = document.createElement('p');
    searchTitle.innerText = `${searchUrls.length} searchresults in ${searchCategory}`;
    searchInfo.append(searchTitle);
    if (searchSortingText != 'Sort by...') {
        const searchSorted = document.createElement('p');
        searchSorted.innerText = `Sorted by: ${searchSortingText}`;
        searchInfo.append(searchSorted);
    }

    if (searchCategory == 'movie'){
                searchUrls.forEach(movie => {
                    const card = new MovieCard(movie);
                    listContent.append(card.render());
                });
    } else if (searchCategory == 'person'){
            searchUrls.forEach((person) => {
                const card = new PersonCard(person);
                const cardElement = card.render();
                cardElement.classList.add('no-hover');
                listContent.append(cardElement);
              });
    }
}

async function renderMoviePage (movieId) {
    const ratedElement = document.querySelector('#ratedMovies');
    const popElement = document.querySelector('#popularMovies');
    searchInfo.innerHTML = '';
    listContent.innerHTML = '';
    movieContent.innerHTML = '';
    ratedElement.classList.remove('active');
    popElement.classList.remove('active');

    try {
        const movie = await getMovieById(movieId);
        const trailers = await getMovieTrailers(movieId);
        const credits = await getMovieCredits(movieId);
    
        const trailer = trailers.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    
        const card = new MovieCard(movie, {
          detailed: true,
          showDescription: true,
          trailer,
          cast: credits.cast,
          crew: credits.crew
        });
        console.log(card);
        movieContent.append(card.render());
    
      } catch (err) {
        console.error(err);
        showError('Could not load full movie info.');
      }
}

export {showError, renderTop, renderSearchBar, renderSearchResult, renderMoviePage};