import { getPopularMovies, getRatedMovies, getSearchResult } from "./modules/movieapi.js";
import { renderTop, renderSearchBar, renderSearchResult, showError } from "./modules/render.js";

const popElement = document.querySelector('#popularMovies');
const ratedElement = document.querySelector('#ratedMovies');
const headerContent = document.querySelector('#headerContent');
const headerLeft = document.querySelector('#headerLeft');
const headerCenter = document.querySelector('#headerCenter');

const goHome = () => {
    window.location.reload();
    // console.log(window.location)
    // window.location.href = 'http://127.0.0.1:5502/';
};

headerLeft.addEventListener('click', goHome);
headerCenter.addEventListener('click', goHome);

//
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        headerContent.style.backgroundColor = 'var(--mmdbBlack)';
        headerContent.style.color = 'white';

    } else {
        headerContent.style.backgroundColor = 'var(--mmdbGreen)';
        headerContent.style.color = 'var(--mmdbBlack)';
    }
});


const searchLink = document.querySelector('#searchLink');
// Top 10 Rated Movies
ratedElement.addEventListener('click', event => {
    event.preventDefault();
    ratedElement.classList.add('active');
    popElement.classList.remove('active');
    getRatedMovies()
    .then(renderTop)
    // .then(data => {
    //     console.log('Rated movies from database:', data);
    //     renderTop(data);
    // })
    .catch(showError);
});
// Top 10 Popular Movies
popElement.addEventListener('click', event => {
    event.preventDefault();
    popElement.classList.add('active');
    ratedElement.classList.remove('active');
    getPopularMovies()
    .then(renderTop)
    // .catch(err => console.error(err));
    .catch(showError);
});

// Searchlink
searchLink.addEventListener('click', event => {
    event.preventDefault();
    ratedElement.classList.remove('active');
    popElement.classList.remove('active');
    renderSearchBar();
});

const movieRadio = document.getElementById('movie');
const personRadio = document.getElementById('person');
const sortSelect = document.getElementById('sortSelect');
// Search
function resetSortAndToggleOptions() {
    // Reset select to default
    sortSelect.selectedIndex = 0;
  
    // when "person" is selected, no movie-only sorting options
    const movieOnlyOptions = sortSelect.querySelectorAll('#movie-only');
    movieOnlyOptions.forEach(opt => {
      const isMovie = movieRadio.checked;
      opt.disabled = !isMovie;
      opt.hidden = !isMovie;
    });
  }
  
  // 
  movieRadio.addEventListener('change', resetSortAndToggleOptions);
  personRadio.addEventListener('change', resetSortAndToggleOptions);
  
  
resetSortAndToggleOptions();

const searchForm = document.querySelector('form');

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(searchForm);

    const searchInput = formData.get('query');
    const searchCategory = formData.get('category');
    const searchSorting = formData.get('sort');
    
    const searchSortingText = sortSelect.options[sortSelect.selectedIndex].text;

    //console.log("Sorted by: " + searchSortingText);
    getSearchResult(searchCategory, searchInput, searchSorting)
        .then(searchUrls => {
            renderSearchResult(searchUrls, searchCategory, searchSortingText);
            //console.log(searchUrls);
        })
        .catch(showError);
});