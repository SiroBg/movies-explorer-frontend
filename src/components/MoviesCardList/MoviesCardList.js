import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound';
import useMovieSearch from '../../hooks/useMovieSearch';
import { useState } from 'react';

function MoviesCardList({ getMovies, cardsType }) {
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

  function renderMovies() {
    return (
      <ul className="movies-card-list">
        {movieSearch.handleSearchResult().map((movie) => (
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

  return (
    <>
      <SearchForm
        onSearch={onSearch}
        onCheckbox={movieSearch.setShortMovieCheckbox}
      />
      {isLoading && <Preloader />}
      {showResults && handleRenderMovies()}
    </>
  );
}

export default MoviesCardList;
