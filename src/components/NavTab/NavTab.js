import { HashLink } from 'react-router-hash-link';

function NavTab() {
  return (
    <nav className="navtab">
      <HashLink to="#about-project" className="navtab__link">
        О проекте
      </HashLink>
      <HashLink to="#tech" className="navtab__link">
        Технологии
      </HashLink>
      <HashLink to="#student" className="navtab__link">
        Студент
      </HashLink>
    </nav>
  );
}

export default NavTab;
