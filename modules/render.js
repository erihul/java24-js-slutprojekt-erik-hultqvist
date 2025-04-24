import { MovieCard } from "./classes/movieCard.js";
import { PersonCard } from "./classes/personCard.js";
import { MoviePage } from "./classes/moviePage.js";
import { getMovieById, getMovieTrailers, getMovieCredits } from "./movieapi.js";

const searchInfo = document.querySelector('#searchInfo');
const listContent = document.querySelector('#listContent');
const movieContent = document.querySelector('#movieContent');
const searchBarEl = document.querySelector('#searchBar');
const sortingSelectEl = document.querySelector('#sortSelect');

function clearMainContent() {
    searchInfo.innerHTML = '';
    listContent.innerHTML = '';
    movieContent.innerHTML = '';
}
function hideElements(...elements) {
    elements.forEach(el => el.classList.add('hidden'));
}
function showElements(...elements) {
    elements.forEach(el => el.classList.remove('hidden'));
}
function resetActiveTabs(...tabs) {
    tabs.forEach(tab => tab.classList.remove('active'));
}
function scrollToTop() {
    headerLinkBar.scrollIntoView({ behavior: 'smooth' });
}
function showError(message) {
    console.log('showError är: ' + message)
    const errorEl = document.querySelector('#errorMessage');
    errorEl.innerText = message;
    showElements(errorEl);

    setTimeout(() => {
        hideElements(errorEl);
    }, 5000);
}
// Namnge tydligare  beskrivande
function renderTop10Movies(movieUrls){
    clearMainContent();
    hideElements(searchBarEl, sortingSelectEl);
    
    movieUrls.slice(0, 10).forEach((movie, index) => {
        const card = new MovieCard(movie, { index, showDescription: false });
        listContent.append(card.render());
        console.log(movie);
      });

    scrollToTop();
}
function renderSearchBar() {
    clearMainContent();
    headerLinkBar.style.backgroundColor = 'var(--mmdbBlack)';
    headerLinkBar.style.color = 'white';
    showElements(searchBarEl);
    hideElements(sortingSelectEl);
    resetActiveTabs(top10RatedMoviesEl, top10PopularMoviesEl);
}

function renderSearchResult(searchUrls, searchCategory, searchSortingText) {
    clearMainContent();
    
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
    scrollToTop();
}

async function renderMoviePage (movieId) {
    resetActiveTabs(top10RatedMoviesEl, top10PopularMoviesEl);
    clearMainContent();
    hideElements(searchBarEl, sortingSelectEl);

    try {
        const movie = await getMovieById(movieId);
        const trailers = await getMovieTrailers(movieId);
        const credits = await getMovieCredits(movieId);
    
        const trailer = trailers.find(v => v.type === 'Trailer' && v.site === 'YouTube');
    
        const moviePage = new MoviePage(movie, {
          trailer,
          cast: credits.cast,
          crew: credits.crew
        });
        console.log(moviePage);
        movieContent.append(moviePage.render());
    
      } catch (err) {
        console.error(err);
        showError('Could not load full movie info.');
      }
}
export {showError, renderTop10Movies, renderSearchBar, renderSearchResult, renderMoviePage};