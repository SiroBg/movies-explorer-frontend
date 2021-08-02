import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import closeKey from '../../utils/constants';

function Navigation(isLoggedIn) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  function closeNavOnOverlay(e) {
    if (e.target === e.currentTarget) {
      setIsNavOpen(false);
    }
  }

  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  useEffect(() => {
    function closeNavOnEscape(e) {
      if (e.key === closeKey) {
        setIsNavOpen(false);
      }
    }

    isNavOpen && window.addEventListener('keydown', closeNavOnEscape);

    return () => {
      window.removeEventListener('keydown', closeNavOnEscape);
    };
  }, [isNavOpen]);

  return (
    <>
      {isLoggedIn ? (
        <div
          className={isNavOpen ? 'navigation navigation_opened' : 'navigation'}
          onClick={closeNavOnOverlay}
        >
          <nav
            className={
              isNavOpen
                ? 'navigation__menu navigation__menu_opened'
                : 'navigation__menu'
            }
          >
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
          <div
            className={
              isNavOpen ? 'burger active navigation__burger-active' : 'burger'
            }
            onClick={toggleNav}
          >
            <div className="burger__bar"></div>
          </div>
        </div>
      ) : (
        <nav className="navigation__auth-menu">
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
