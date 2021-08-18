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
  const showResults = searchedMovies.length !== 0;

  function handleRenderMovies() {
    if (isSearchActive) {
      return filteredMovies;
    }
    return searchedMovies;
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
        <button type="button" onClick={onReturnResultClick}>
          Показать все фильмы
        </button>
      );
    }
  }

  function onReturnResultClick() {
    setIsSearchActive(false);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="saved-movies">
        <MoviesCardList
          moviesType="savedMovies"
          searchedMovies={handleRenderMovies()}
          onMovieBtn={onMovieBtn}
          showResults={showResults}
          onSearch={onSavedMoviesSearch}
          onCheckbox={onShortMovieCheckBox}
        />
        {renderReturnResultBtn()}
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
