import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesNotFound from '../MoviesNotFound/MoviesNotFound';

function MoviesCardList({
  searchedMovies,
  moviesType,
  moviesAmountToShow,
  showMoreMovies,
  handleMoviesToShow,
  showResults,
  isMovieListLoading,
  apiError,
  onSearch,
  onCheckbox,
  onMovieBtn,
}) {
  function onMovieSearch({ searchValue }) {
    if (searchValue) {
      handleMoviesToShow();
      onSearch({ searchValue });
    }
  }

  function onShortMovieCheckbox(e) {
    handleMoviesToShow();
    onCheckbox(e);
  }

  function renderMoviesToShow() {
    const moviesToShow = searchedMovies.slice(0, moviesAmountToShow);
    return moviesToShow;
  }

  function renderMovies() {
    const moviesToRender =
      moviesType === 'searchMovies' ? renderMoviesToShow() : searchedMovies;

    return (
      <ul className="movies-card-list">
        {moviesToRender.map((movie) => (
          <MoviesCard
            key={movie.id}
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

  function renderLoadMoreButton() {
    return (
      searchedMovies.length > moviesAmountToShow &&
      !isMovieListLoading && (
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
        onSearch={onMovieSearch}
        onCheckbox={onShortMovieCheckbox}
        moviesType={moviesType}
        isMovieListLoading={isMovieListLoading}
      />
      {isMovieListLoading && <Preloader />}
      {showResults && handleRenderMovies()}
      {moviesType === 'searchMovies' && renderLoadMoreButton()}
    </>
  );
}

export default MoviesCardList;
