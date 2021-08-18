import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound';

function MoviesCardList({
  searchedMovies,
  moviesType,
  showResults,
  isMovieListLoading,
  apiError,
  onSearch,
  onMovieBtn,
  onCheckbox,
}) {
  function renderMovies() {
    return (
      <ul className="movies-card-list">
        {searchedMovies.map((movie) => (
          <MoviesCard
            key={movie.movieId}
            movie={movie}
            moviesType={moviesType}
            onMovieBtn={onMovieBtn}
          />
        ))}
      </ul>
    );
  }

  function handleRenderMovies() {
    return searchedMovies.length === 0 || apiError ? (
      <MoviesNotFound apiError={apiError} />
    ) : (
      renderMovies()
    );
  }

  return (
    <>
      <SearchForm
        onSearch={onSearch}
        onCheckbox={onCheckbox}
        moviesType={moviesType}
        isMovieListLoading={isMovieListLoading}
      />
      {isMovieListLoading && <Preloader />}
      {showResults && handleRenderMovies()}
    </>
  );
}

export default MoviesCardList;
