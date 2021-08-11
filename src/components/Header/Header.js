import headerLogo from '../../images/header__logo.svg';
import { NavLink } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';

function Header() {
  return (
    <header className="header">
      <NavLink
        exact
        to="/"
        className="header__link"
        activeClassName="header__link_current"
      >
        <img
          className="header__logo"
          src={headerLogo}
          alt="Логотип movies-explorer"
        />
      </NavLink>
      <Navigation />
    </header>
  );
}

export default Header;
