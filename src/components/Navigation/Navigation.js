import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navigation(isLoggedIn) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  return (
    <>
      {isLoggedIn ? (
        <nav className="navigation">
          {isNavOpen && (
            <NavLink
              exact
              to="/"
              className="navigation__link"
              activeClassName="navigation__link_active"
            >
              Главная
            </NavLink>
          )}
          <NavLink
            to="/movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Фильмы
          </NavLink>
          <NavLink
            to="/saved-movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Сохранённые фильмы
          </NavLink>
          <div className="navigation__profile">
            <NavLink
              to="/profile"
              className="navigation__profile-link"
              activeClassName="navigation__profile-link_active"
            >
              Аккаунт
            </NavLink>
          </div>
        </nav>
      ) : (
        <nav className="navigation">
          <Link to="/signup" className="navigation__auth-link">
            Регистрация
          </Link>
          <Link
            to="/signin"
            className="navigation__auth-link navigation__auth-link_type_signin"
          >
            Войти
          </Link>
        </nav>
      )}
    </>
  );
}

export default Navigation;
