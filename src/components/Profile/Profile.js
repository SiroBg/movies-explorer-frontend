import Header from '../Header/Header';
import FormError from '../FormError/FormError';
import ResponseError from '../ResponseError/ResponseError';

function Profile({ name = 'Борис', email = 'borisusik@yandex.ru' }) {
  return (
    <>
      <Header />
      <main className="profile">
        <h1 className="profile__title">Привет, {name}!</h1>
        <form className="profile__form" method="post">
          <label className="profile__label">
            Имя
            <input
              className="profile__input"
              type="text"
              minLength="2"
              maxLength="30"
              placeholder="Введите новое имя"
              required
            />
            <FormError errorText="текст ошибки валидации" isActive />
          </label>
          <label className="profile__label">
            Почта
            <input
              className="profile__input"
              type="email"
              placeholder="Введите новый e-mail"
              required
            />
            <FormError errorText="текст ошибки" />
          </label>
          <ResponseError isActive />
          <button className="profile__submit" type="submit">
            Редактировать
          </button>
        </form>
        <button className="profile__logout-button" type="button">
          Выйти из аккаунта
        </button>
      </main>
    </>
  );
}

export default Profile;
