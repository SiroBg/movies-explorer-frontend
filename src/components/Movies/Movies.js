import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { DEVICE_SETTINGS } from '../../utils/constants';
import handleMovieSearch from '../../utils/handleMovieSearch';

function Movies({
  showResults,
  isMovieListLoading,
  apiError,
  searchedMovies,
  onSearch,
  isLoggedIn,
  onMovieBtn,
  getLastSearch,
  savedMoives,
}) {
  const [moviesAmountToShow, setMoviesAmountToShow] = useState(0);
  const [showStep, setShowStep] = useState(0);
  const [shortMovieCheckBox, setShortMovieCheckBox] = useState(false);
  const movieSearch = handleMovieSearch();

  useEffect(() => {
    getLastSearch();
  }, []);

  function onShortMovieCheckBox() {
    handleMoviesToShow();
    setShortMovieCheckBox(!shortMovieCheckBox);
  }

  function handleOnSearch(searchValue) {
    handleMoviesToShow();
    onSearch(searchValue);
  }

  function handleRenderMovies() {
    return shortMovieCheckBox
      ? movieSearch
          .filterShortMovies(searchedMovies)
          .slice(0, moviesAmountToShow)
      : searchedMovies.slice(0, moviesAmountToShow);
  }

  function handleMoviesToShow() {
    if (window.innerWidth > DEVICE_SETTINGS.desktop.width) {
      setShowStep(DEVICE_SETTINGS.desktop.showStep);
      setMoviesAmountToShow(DEVICE_SETTINGS.desktop.moviesAmount);
      return;
    }

    if (window.innerWidth > DEVICE_SETTINGS.tablet.width) {
      setShowStep(DEVICE_SETTINGS.tablet.showStep);
      setMoviesAmountToShow(DEVICE_SETTINGS.tablet.moviesAmount);
      return;
    }

    if (window.innerWidth > DEVICE_SETTINGS.mobile.width) {
      setShowStep(DEVICE_SETTINGS.mobile.showStep);
      setMoviesAmountToShow(DEVICE_SETTINGS.mobile.moviesAmount);
      return;
    }
  }

  useEffect(() => {
    handleMoviesToShow();
    window.addEventListener('resize', handleMoviesToShow);

    return () => {
      window.removeEventListener('resize', handleMoviesToShow);
    };
  }, [searchedMovies]);

  function showMoreMovies() {
    setMoviesAmountToShow(moviesAmountToShow + showStep);
  }

  function renderLoadMoreButton() {
    const moviesLength = shortMovieCheckBox
      ? movieSearch.filterShortMovies(searchedMovies).length
      : searchedMovies.length;

    return (
      moviesLength > moviesAmountToShow &&
      !isMovieListLoading && (
        <button
          className="movies__button"
          type="button"
          onClick={showMoreMovies}
        >
          Ещё
        </button>
      )
    );
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="movies">
        <MoviesCardList
          searchedMovies={handleRenderMovies()}
          savedMoives={savedMoives}
          moviesType="searchMovies"
          showResults={showResults}
          isMovieListLoading={isMovieListLoading}
          apiError={apiError}
          onSearch={handleOnSearch}
          onMovieBtn={onMovieBtn}
          onCheckbox={onShortMovieCheckBox}
        />
        {renderLoadMoreButton()}
      </main>
      <Footer />
    </>
  );
}

export default Movies;
