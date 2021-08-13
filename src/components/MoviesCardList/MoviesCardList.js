import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound';
import useMovieSearch from '../../hooks/useMovieSearch';
import { useState } from 'react';

function MoviesCardList({
  getMovies,
  cardsType,
  moviesAmountToShow,
  showMoreMovies,
  handleMoviesToShow,
}) {
  const [showResults, setShowResults] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const movieSearch = useMovieSearch();

  function onSearch({ searchValue }) {
    if (searchValue) {
      setShowResults(false);
      setIsLoading(true);
      getMovies()
        .then((res) => {
          handleMoviesToShow();
          setShowResults(true);
          setApiError(false);
          movieSearch.sortSearchedMovies(res, searchValue);
        })
        .catch((err) => {
          setShowResults(true);
          setApiError(true);
          console.log(err);
        })
        .finally(() => setIsLoading(false));
    }
  }

  function renderMoviesToShow() {
    const moviesToShow = movieSearch
      .handleSearchResult()
      .slice(0, moviesAmountToShow);
    return moviesToShow;
  }

  function renderMovies() {
    const moviesToRender =
      cardsType === 'searchMovies'
        ? renderMoviesToShow()
        : movieSearch.handleSearchResult();

    return (
      <ul className="movies-card-list">
        {moviesToRender.map((movie) => (
          <MoviesCard key={movie.id} movie={movie} cardType={cardsType} />
        ))}
      </ul>
    );
  }

  function handleRenderMovies() {
    return movieSearch.handleSearchResult().length === 0 || apiError ? (
      <MoviesNotFound apiError={apiError} />
    ) : (
      renderMovies()
    );
  }

  function renderLoadMoreButton() {
    return (
      movieSearch.handleSearchResult().length > moviesAmountToShow &&
      !isLoading && (
        <button
          className="movies-card-list__button"
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
      <SearchForm
        onSearch={onSearch}
        onCheckbox={movieSearch.setShortMovieCheckbox}
      />
      {isLoading && <Preloader />}
      {showResults && handleRenderMovies()}
      {cardsType === 'searchMovies' && renderLoadMoreButton()}
    </>
  );
}

export default MoviesCardList;
