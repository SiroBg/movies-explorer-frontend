function MoviesCard({ movie, cardType }) {
  return (
    <li className="movies-card">
      <div className="movies-card__container">
        <h3 className="movies-card__title">{movie.nameRU}</h3>
        <span className="movies-card__duration">
          {`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}
        </span>
        <button
          type="button"
          className={
            cardType === 'savedMovies'
              ? 'movies-card__button movies-card__button_type_saved-movies'
              : 'movies-card__button movies-card__button_type_saved'
          }
        />
      </div>
      <img
        className="movies-card__image"
        src={`https://api.nomoreparties.co${movie.image.url}`}
        alt={movie.nameRU}
      />
    </li>
  );
}

export default MoviesCard;
