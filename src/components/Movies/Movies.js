import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import useMovieSearch from '../../hooks/useMovieSearch';
import { DEVICE_SETTINGS } from '../../utils/constants';

function Movies({
  showResults,
  setShowResults,
  isMovieListLoading,
  apiError,
  searchedMovies,
  onSearch,
  isLoggedIn,
  onMovieBtn,
}) {
  const [moviesAmountToShow, setMoviesAmountToShow] = useState(0);
  const [showStep, setShowStep] = useState(0);

  const movieSearch = useMovieSearch();

  function handleLastSearch() {
    const lastSearch = localStorage.getItem('lastSearch');

    if (lastSearch) {
      const searchValues = JSON.parse(lastSearch);
      setShowResults(true);
      movieSearch.sortSearchedMovies(
        searchValues.movies,
        searchValues.searchValue
      );
    }
  }

  function handleSearch() {
    if (searchedMovies.movies)
      movieSearch.sortSearchedMovies(
        searchedMovies.movies,
        searchedMovies.searchValue
      );
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
    handleLastSearch();
    handleSearch();
    handleMoviesToShow();
    window.addEventListener('resize', handleMoviesToShow);

    return () => {
      window.removeEventListener('resize', handleMoviesToShow);
    };
  }, [searchedMovies]);

  function showMoreMovies() {
    setMoviesAmountToShow(moviesAmountToShow + showStep);
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="movies">
        <MoviesCardList
          searchedMovies={movieSearch.handleSearchResult()}
          moviesType="searchMovies"
          moviesAmountToShow={moviesAmountToShow}
          showStep={showStep}
          showMoreMovies={showMoreMovies}
          handleMoviesToShow={handleMoviesToShow}
          showResults={showResults}
          isMovieListLoading={isMovieListLoading}
          apiError={apiError}
          onSearch={onSearch}
          onCheckbox={movieSearch.setShortMovieCheckbox}
          onMovieBtn={onMovieBtn}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
