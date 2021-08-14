import { useEffect } from 'react';
import useFormAndValidation from '../../hooks/useFormValidation';
import FormError from '../FormError/FormError';

function SearchForm({ onSearch, onCheckbox, cardsType }) {
  const formAndValidation = useFormAndValidation();

  function setLastSearchValue() {
    if (cardsType === 'searchMovies') {
      const lastSearchValue = JSON.parse(localStorage.getItem('lastSearch'));

      lastSearchValue
        ? formAndValidation.setValues({
            searchValue: lastSearchValue.searchValue,
          })
        : formAndValidation.setValues({ searchValue: '' });
    }
  }

  useEffect(() => {
    setLastSearchValue();
  }, []);

  function handleCheckbox(e) {
    onCheckbox(e.target.checked);
  }

  function handleSubmit(e) {
    e.preventDefault();
    formAndValidation.setIsValid(e.target.checkValidity());
    onSearch(formAndValidation.values);
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
          onClick={handleCheckbox}
        />
        <span className="search-form__checkbox-slider"></span>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
