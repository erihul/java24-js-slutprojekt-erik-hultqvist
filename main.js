import { getTop10RatedMovies, getTop10PopularMovies, getSearchResult } from "./modules/movieapi.js";
import { renderTop10Movies, renderSearchBar, renderSearchResult, showError, renderMoviePage } from "./modules/render.js";

const headerTitleLeft = document.querySelector('#headerTitleLeft');
const headerTitleCenter = document.querySelector('#headerTitleCenter');
const top10RatedMoviesEl = document.querySelector('#top10RatedMoviesEl');
const top10PopularMoviesEl = document.querySelector('#top10PopularMoviesEl');
const searchLink = document.querySelector('#searchLink');
const searchForm = document.querySelector('form');
const movieCategoryBtn = document.querySelector('#movie');
const personCategoryBtn = document.querySelector('#person');
const sortingSelectEl = document.querySelector('#sortSelect');
let searchResults = [];
let lastCategory = '';

const goHome = () => {
    window.location.reload();
    // console.log(window.location)
    // window.location.href = 'http://127.0.0.1:5502/';
};

headerTitleLeft.addEventListener('click', goHome);
headerTitleCenter.addEventListener('click', goHome);

//
window.addEventListener('scroll', () => {
    const headerLinkBar = document.querySelector('#headerLinkBar');
    if (window.scrollY > 50) {
        headerLinkBar.style.backgroundColor = 'var(--mmdbBlack)';
        headerLinkBar.style.color = 'white';

    } else {
        headerLinkBar.style.backgroundColor = 'var(--mmdbGreen)';
        headerLinkBar.style.color = 'var(--mmdbBlack)';
    }
});


// Top 10 Rated Movies
top10RatedMoviesEl.addEventListener('click', event => {
    event.preventDefault();
    top10RatedMoviesEl.classList.add('active');
    top10PopularMoviesEl.classList.remove('active');
    getTop10RatedMovies()
    .then(renderTop10Movies)
    .catch(showError);
});
// Top 10 Popular Movies
top10PopularMoviesEl.addEventListener('click', event => {
    event.preventDefault();
    top10PopularMoviesEl.classList.add('active');
    top10RatedMoviesEl.classList.remove('active');
    getTop10PopularMovies()
    .then(renderTop10Movies)
    // .catch(err => console.error(err));
    .catch(showError);
});

// Searchlink
searchLink.addEventListener('click', event => {
    event.preventDefault();
    top10RatedMoviesEl.classList.remove('active');
    top10RatedMoviesEl.classList.remove('active');
    sortingSelectEl.selectedIndex = 0;

    renderSearchBar();
});

// Search
function resetSortAndToggleOptions() {
    // Reset select to default
    sortingSelectEl.selectedIndex = 0;
  
    // when "person" is selected, no movie-only sorting options
    const movieOnlyOptions = sortingSelectEl.querySelectorAll('#movie-only');
    movieOnlyOptions.forEach(opt => {
      const isMovie = movieCategoryBtn.checked;
      opt.disabled = !isMovie;
      opt.hidden = !isMovie;
    });
  }
  
  // 
  movieCategoryBtn.addEventListener('change', resetSortAndToggleOptions);
  personCategoryBtn.addEventListener('change', resetSortAndToggleOptions);
    
resetSortAndToggleOptions();

searchForm.addEventListener('submit', event => {
    event.preventDefault();
    sortingSelectEl.classList.remove('hidden');
    const formData = new FormData(searchForm);
    
    const searchInput = formData.get('query');
    const searchCategory = formData.get('category');
    const searchSorting = sortingSelectEl.value;
    const searchSortingText = sortingSelectEl.options[sortingSelectEl.selectedIndex].text;
    
    getSearchResult(searchCategory, searchInput) // fetch once, no sorting here
    .then(results => {
        searchResults = results; // save the results globally
        lastCategory = searchCategory;
        const sortedResults = sortResults(searchResults, searchSorting, searchCategory); // sort locally
        renderSearchResult(sortedResults, searchCategory, searchSortingText);
    })
    .catch(showError);
});

sortingSelectEl.addEventListener('change', () => {
    const formData = new FormData(searchForm);
    const currentCategory = formData.get('category');
    const searchSorting = sortingSelectEl.value;
    const searchSortingText = sortingSelectEl.options[sortingSelectEl.selectedIndex].text;

    // Don't sort if the category changed since last search
    if (currentCategory !== lastCategory || searchResults.length === 0) return;

    const sortedResults = sortResults(searchResults, searchSorting, currentCategory);
    renderSearchResult(sortedResults, currentCategory, searchSortingText);
});

function sortResults(results, searchSorting, searchCategory) {
    const sorted = [...results];

    if (searchSorting && searchCategory === 'movie') {
        switch (searchSorting) {
            case 'a-z':
                sorted.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'z-a':
                sorted.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'popularity.asc':
                sorted.sort((a, b) => a.popularity - b.popularity);
                break;
            case 'popularity.desc':
                sorted.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'vote_average.desc':
                sorted.sort((a, b) => b.vote_average - a.vote_average);
                break;
            case 'vote_average.asc':
                sorted.sort((a, b) => a.vote_average - b.vote_average);
                break;
        }
    } else if (searchSorting && searchCategory === 'person') {
        switch (searchSorting) {
            case 'a-z':
                sorted.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'z-a':
                sorted.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'popularity.asc':
                sorted.sort((a, b) => a.popularity - b.popularity);
                break;
            case 'popularity.desc':
                sorted.sort((a, b) => b.popularity - a.popularity);
                break;
        }
    }

    return sorted;
}
document.body.addEventListener('click', async event => {
    const clickable = event.target.closest('.clickable-card');
    if (!clickable) return;
  
    const id = clickable.dataset.id;
    const type = clickable.dataset.type;
  
    if (type === 'movie') {
      try {
        await renderMoviePage(id);
      } catch (error) {
        console.error('Error rendering movie page:', error);
      }
    }
  });