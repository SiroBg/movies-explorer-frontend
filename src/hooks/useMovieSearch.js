import { useState } from 'react';
import { SHORT_MOVIE_LENGTH } from '../utils/constants';

export default function useMovieSearch() {
  const [searchedMovies, setSearchedMoveis] = useState([]);
  const [filteredShortMovies, setFilteredShortMovies] = useState([]);
  const [shortMovieCheckBox, setShortMovieCheckbox] = useState(false);

  function checkMovieNameAndDescription(movie, searchValue) {
    return (
      movie.nameRU.toLowerCase().includes(searchValue.toLowerCase()) ||
      movie.description.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  function isShortMovie(movie) {
    return movie.duration <= SHORT_MOVIE_LENGTH;
  }

  function filterSearchedMovies(moviesArray, searchValue) {
    return moviesArray.filter((movie) => {
      return checkMovieNameAndDescription(movie, searchValue);
    });
  }

  function filterShortMovies(moviesArray) {
    return moviesArray.filter((movie) => {
      return isShortMovie(movie);
    });
  }

  function sortSearchedMovies(moviesArray, searchValue) {
    setSearchedMoveis(filterSearchedMovies(moviesArray, searchValue));
    setFilteredShortMovies(
      filterShortMovies(filterSearchedMovies(moviesArray, searchValue))
    );
  }

  function handleSearchResult() {
    return shortMovieCheckBox ? filteredShortMovies : searchedMovies;
  }

  return {
    searchedMovies,
    filteredShortMovies,
    setSearchedMoveis,
    setFilteredShortMovies,
    filterSearchedMovies,
    setShortMovieCheckbox,
    sortSearchedMovies,
    shortMovieCheckBox,
    handleSearchResult,
  };
}
