import { shortMovieLength } from './constants';

function handleSearch(moviesArray, searchValues) {
  function checkMovie(movie) {
    return movie.nameRU
      .toLowerCase()
      .includes(searchValues.search.toLowerCase());
  }

  return moviesArray.filter((movie) => {
    if (searchValues.shortMovie) {
      return movie.duration <= shortMovieLength ? checkMovie(movie) : false;
    }
    return checkMovie(movie);
  });
}

export default handleSearch;
