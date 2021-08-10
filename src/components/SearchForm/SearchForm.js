function SearchForm() {
  return (
    <form className="search-form" method="get">
      <div className="search-form__container">
        <input
          type="text"
          className="search-form__search-field"
          placeholder="Фильм"
          required
        />
        <button type="submit" className="search-form__button">
          Найти
        </button>
      </div>
      <label className="search-form__checkbox-label">
        <input type="checkbox" className="search-form__checkbox" />
        <span className="search-form__checkbox-slider"></span>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
