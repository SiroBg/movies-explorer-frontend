import useFormAndValidation from '../../hooks/useFormValidation';
import FormError from '../FormError/FormError';

function SearchForm() {
  const formAndValidation = useFormAndValidation();

  function handleSubmit(e) {
    e.preventDefault();
    formAndValidation.setIsValid(e.target.checkValidity());
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
          name="search"
          type="text"
          className="search-form__search-field"
          placeholder="Фильм"
          required
          onChange={formAndValidation.handleSearch}
          value={formAndValidation.values.search || ''}
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
          onChange={formAndValidation.handleCheckBox}
          checked={formAndValidation.values.shortMovie || false}
        />
        <span className="search-form__checkbox-slider"></span>
        Короткометражки
      </label>
    </form>
  );
}

export default SearchForm;
