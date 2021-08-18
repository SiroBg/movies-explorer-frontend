function MoviesCard({ movie, moviesType, onMovieBtn, savedMoives }) {
  function handleMovieClassName() {
    if (moviesType === 'searchMovies') {
      const isSaved = savedMoives.some((m) => m.movieId === movie.movieId);
      return isSaved ? 'movies-card__button_type_saved' : '';
    }
    return 'movies-card__button_type_saved-movies';
  }

  function handleMovieBtn() {
    onMovieBtn(movie);
  }

  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h3 className="movies-card__title">{movie.nameRU}</h3>
        <span className="movies-card__duration">
          {`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}
        </span>
        <button
          type="button"
          className={`movies-card__button ${handleMovieClassName()}`}
          onClick={handleMovieBtn}
        />
      </div>
      <a
        className="movies-card__trailer-link"
        href={movie.trailer}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={movie.image}
          alt={movie.nameRU}
        />
      </a>
    </li>
  );
}

export default MoviesCard;
