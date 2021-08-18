import { SHORT_MOVIE_LENGTH, BASE_URL } from '../utils/constants';

export default function handleMovieSearch() {
  function checkMovieNameAndDescription(movie, searchValue) {
    if (movie.nameRU && movie.nameEN) {
      return (
        movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return movie.nameRU.toLowerCase().includes(searchValue.toLowerCase());
  }

  function isShortMovie(movie) {
    return movie.duration <= SHORT_MOVIE_LENGTH;
  }

  function setRightMoviesFormat(moviesArray) {
    return moviesArray.map((movie) => {
      return {
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: BASE_URL + movie.image.url,
        trailer: movie.trailerLink,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
        thumbnail: BASE_URL + movie.image.formats.thumbnail.url,
        movieId: movie.id,
      };
    });
  }

  function filterSearchedMovies(moviesArray, searchValue) {
    return moviesArray.filter((movie) => {
      return checkMovieNameAndDescription(movie, searchValue);
    });
  }

  function filterShortMovies(moviesArray) {
    return moviesArray.filter((movie) => isShortMovie(movie));
  }

  function filterMoviesAndSetRightFormat(moviesArray, searchValue) {
    return filterSearchedMovies(setRightMoviesFormat(moviesArray), searchValue);
  }

  return {
    filterSearchedMovies,
    filterShortMovies,
    filterMoviesAndSetRightFormat,
  };
}
