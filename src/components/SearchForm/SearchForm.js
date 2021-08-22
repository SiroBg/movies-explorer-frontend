import { useEffect } from 'react';
import useFormAndValidation from '../../hooks/useFormValidation';
import FormError from '../FormError/FormError';

function SearchForm({
  onSearch,
  onCheckbox,
  moviesType,
  isMovieListLoading,
  isSearchActive,
}) {
  const formAndValidation = useFormAndValidation();

  function setLastSearchValue() {
    const lastSearchValue = JSON.parse(localStorage.getItem('lastSearch'));
    if (moviesType === 'searchMovies' && lastSearchValue) {
      formAndValidation.setValues({
        searchValue: lastSearchValue.value,
      });
    }
  }

  useEffect(() => {
    setLastSearchValue();
  }, []);

  useEffect(() => {
    handleSavedMoviesSearch();
  }, [isSearchActive]);

  function handleSavedMoviesSearch() {
    if (!isSearchActive && moviesType === 'savedMovies') {
      formAndValidation.setValues({
        searchValue: '',
      });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    formAndValidation.setIsValid(e.target.checkValidity());
    if (formAndValidation.values.searchValue) {
      onSearch(formAndValidation.values.searchValue);
    }
  }

  return (
    <form
      className="search-form"
      method="get"
      noValidate
      onSubmit={handleSubmit}
    >
      <div className="search-form__container">
        <input
          name="searchValue"
          type="text"
          className="search-form__search-field"
          placeholder="Фильм"
          required
          onChange={formAndValidation.handleSearch}
          value={formAndValidation.values.searchValue || ''}
          autoComplete="off"
          disabled={isMovieListLoading}
        />
        <FormError
          errorText="Нужно ввести ключевое слово"
          isActive={!formAndValidation.isValid}
        />
        <button type="submit" className="search-form__button">
          Найти
        </button>
      </div>
      <label className="search-form__checkbox-label">
        <input
          name="shortMovie"
          type="checkbox"
          className="search-form__checkbox"
          onClick={onCheckbox}
          disabled={isMovieListLoading}
        />
        <span className="search-form__checkbox-slider"></span>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
