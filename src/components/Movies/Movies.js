import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';

function Movies({
  showResults,
  isMovieListLoading,
  apiError,
  searchedMovies,
  onSearch,
  onCheckbox,
}) {
  const [moviesAmountToShow, setMoviesAmountToShow] = useState(0);
  const [showStep, setShowStep] = useState(0);

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
    handleMoviesToShow();
    window.addEventListener('resize', handleMoviesToShow);

    return () => {
      window.removeEventListener('resize', handleMoviesToShow);
    };
  }, []);

  function showMoreMovies() {
    setMoviesAmountToShow(moviesAmountToShow + showStep);
  }

  return (
    <>
      <Header />
      <main className="movies">
        <MoviesCardList
          searchedMovies={searchedMovies}
          cardsType="searchMovies"
          moviesAmountToShow={moviesAmountToShow}
          showStep={showStep}
          showMoreMovies={showMoreMovies}
          handleMoviesToShow={handleMoviesToShow}
          showResults={showResults}
          isMovieListLoading={isMovieListLoading}
          apiError={apiError}
          onSearch={onSearch}
          onCheckbox={onCheckbox}
        />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
