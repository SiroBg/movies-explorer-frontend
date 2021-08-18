function MoviesCard({ movie, moviesType, isSaved, onMovieBtn }) {
  function handleMovieBtn() {
    onMovieBtn({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.url,
      trailer: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.image.formats.thumbnail,
      movieId: movie.id,
    });
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
          className={`movies-card__button ${
            moviesType === 'savedMovies'
              ? 'movies-card__button_type_saved-movies'
              : ''
          } ${isSaved ? 'movies-card__button_type_saved' : ''}`}
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
