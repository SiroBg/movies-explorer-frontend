import { Link } from 'react-router-dom';
import headerLogo from '../../images/header__logo.svg';

function AuthHeader({ title }) {
  return (
    <header className="auth-header">
      <Link className="auth-header__link" to="/">
        <img
          className="auth-header__logo"
          src={headerLogo}
          alt="Логотип movies-explorer"
        />
      </Link>
      <h1 className="auth-header__title">{title}</h1>
    </header>
  );
}

export default AuthHeader;
