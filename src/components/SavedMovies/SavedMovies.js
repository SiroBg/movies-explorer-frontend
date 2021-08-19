import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import handleMovieSearch from '../../utils/handleMovieSearch';
import { useState } from 'react';

function SavedMovies({ isLoggedIn, searchedMovies, onMovieBtn }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [shortMovieCheckBox, setShortMovieCheckBox] = useState(false);
  const movieFilter = handleMovieSearch();
  const showResults = searchedMovies.length !== 0 || isSearchActive;

  function handleRenderMovies() {
    if (isSearchActive) {
      return filteredMovies;
    }
    return searchedMovies;
  }

  function renderMovies() {
    return shortMovieCheckBox
      ? movieFilter.filterShortMovies(handleRenderMovies())
      : handleRenderMovies();
  }

  function onSavedMoviesSearch(searchValue) {
    if (searchValue) {
      setIsSearchActive(true);
      setFilteredMovies(
        movieFilter.filterSearchedMovies(searchedMovies, searchValue)
      );
    }
  }

  function onShortMovieCheckBox() {
    setShortMovieCheckBox(!shortMovieCheckBox);
  }

  function renderReturnResultBtn() {
    if (isSearchActive) {
      return (
        <button
          className="saved-movies__button"
          type="button"
          onClick={onReturnResultClick}
        >
          Показать все фильмы
        </button>
      );
    }
  }

  function onReturnResultClick() {
    setIsSearchActive(false);
  }

  function onMovieBtnClick(movie) {
    setFilteredMovies(
      filteredMovies.filter((m) => m.movieId !== movie.movieId)
    );
    onMovieBtn(movie);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="saved-movies">
        <MoviesCardList
          moviesType="savedMovies"
          searchedMovies={renderMovies()}
          onMovieBtn={onMovieBtnClick}
          showResults={showResults}
          onSearch={onSavedMoviesSearch}
          onCheckbox={onShortMovieCheckBox}
          isSearchActive={isSearchActive}
        />
        {renderReturnResultBtn()}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
