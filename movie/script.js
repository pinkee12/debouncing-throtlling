const API_KEY = '85a2e240';
const searchInput = document.getElementById('searchInput');
const moviesList = document.getElementById('moviesList');

let timeoutId;

const fetchMovies = async (searchTerm) => {
  try {
    const response = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
    const data = await response.json();
    return data.Search || [];
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};

const displayMovies = async () => {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length === 0) {
    moviesList.innerHTML = '';
    return;
  }

  const movies = await fetchMovies(searchTerm);

  if (movies.length > 0) {
    const moviesHTML = movies.map(movie => `<div>${movie.Title} (${movie.Year})</div>`).join('');
    moviesList.innerHTML = moviesHTML;
  } else {
    moviesList.innerHTML = 'No movies found';
  }
};

const debounceSearch = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    displayMovies();
  }, 500); // Adjust the debounce time as needed (milliseconds)
};

searchInput.addEventListener('input', debounceSearch);
