import Header from '../Header/Header';
import FormError from '../FormError/FormError';
import ResponseMessage from '../ResponseMessage/ResponseMessage';
import { useContext, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import useFormAndValidation from '../../hooks/useFormValidation';

function Profile({
  isLoggedIn,
  onLogOut,
  handleUpdateUserInfo,
  response,
  resetResponse,
  isRequestLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const formAndValidation = useFormAndValidation();

  useEffect(() => {
    handleSubmitValidation();
    formAndValidation.setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser]);

  useEffect(() => {
    handleSubmitValidation();
  });

  function handleNameChange(e) {
    formAndValidation.handleNameChange(e);
    resetResponse();
  }

  function handleEmailChange(e) {
    formAndValidation.handleEmailChange(e);
    resetResponse();
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleUpdateUserInfo(
      formAndValidation.values.name,
      formAndValidation.values.email
    );
  }

  function handleSubmitValidation() {
    if (
      currentUser.name === formAndValidation.values.name &&
      currentUser.email === formAndValidation.values.email
    ) {
      formAndValidation.setIsValid(false);
    }
  }

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form
          className="profile__form"
          method="post"
          noValidate
          onSubmit={handleSubmit}
        >
          <label className="profile__label">
            Имя
            <input
              name="name"
              className="profile__input"
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Введите новое имя"
              required
              onChange={handleNameChange}
              value={formAndValidation.values.name || ''}
              autoComplete="off"
              disabled={isRequestLoading}
            />
            <FormError
              errorText={formAndValidation.errors.name}
              isActive={formAndValidation.errors.name}
            />
          </label>
          <label className="profile__label">
            Почта
            <input
              name="email"
              className="profile__input"
              type="email"
              placeholder="Введите новый e-mail"
              required
              onChange={handleEmailChange}
              value={formAndValidation.values.email || ''}
              autoComplete="off"
              disabled={isRequestLoading}
            />
            <FormError
              errorText={formAndValidation.errors.email}
              isActive={formAndValidation.errors.email}
            />
          </label>
          <ResponseMessage response={response} />
          <button
            className={`profile__submit ${
              formAndValidation.isValid ? '' : 'profile__submit_disabled'
            }`}
            type="submit"
            disabled={!formAndValidation.isValid && isRequestLoading}
          >
            Редактировать
          </button>
        </form>
        <button
          className="profile__logout-button"
          type="button"
          onClick={onLogOut}
        >
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}

export default Profile;
