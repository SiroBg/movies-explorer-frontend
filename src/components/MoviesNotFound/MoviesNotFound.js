function MoviesNotFound({ apiError }) {
  return (
    <div className="movies-not-found">
      {apiError
        ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.'
        : 'Ничего не найдено.'}
    </div>
  );
}

export default MoviesNotFound;
