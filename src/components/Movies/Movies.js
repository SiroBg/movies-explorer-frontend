import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import useMovieSearch from '../../hooks/useMovieSearch';

function Movies({
  showResults,
  setShowResults,
  isMovieListLoading,
  apiError,
  searchedMovies,
  onSearch,
}) {
  const [moviesAmountToShow, setMoviesAmountToShow] = useState(0);
  const [showStep, setShowStep] = useState(0);

  const movieSearch = useMovieSearch();

  function handleLastSearch() {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));

    if (lastSearch) {
      setShowResults(true);
      movieSearch.sortSearchedMovies(lastSearch.movies, lastSearch.searchValue);
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
    if (window.innerWidth > 1280) {
      setShowStep(3);
      setMoviesAmountToShow(12);
      return;
    }

    if (window.innerWidth > 768) {
      setShowStep(2);
      setMoviesAmountToShow(8);
      return;
    }

    if (window.innerWidth > 320) {
      setShowStep(1);
      setMoviesAmountToShow(5);
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
      <Header />
      <main className="movies">
        <MoviesCardList
          searchedMovies={movieSearch.handleSearchResult()}
          cardsType="searchMovies"
          moviesAmountToShow={moviesAmountToShow}
          showStep={showStep}
          showMoreMovies={showMoreMovies}
          handleMoviesToShow={handleMoviesToShow}
          showResults={showResults}
          isMovieListLoading={isMovieListLoading}
          apiError={apiError}
          onSearch={onSearch}
          onCheckbox={movieSearch.setShortMovieCheckbox}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
