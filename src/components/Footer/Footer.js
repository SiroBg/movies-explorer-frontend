function Footer() {
  return (
    <footer className="footer">
      <p className="footer__collab">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <p className="footer__date">&copy; {new Date().getFullYear()}</p>
      <ul className="footer__socials-list">
        <li className="footer__socials-item">
          <a
            href="https://praktikum.yandex.ru"
            className="footer__socials-link"
          >
            Яндекс.Практикум
          </a>
        </li>
        <li className="footer__socials-item">
          <a href="https://github.com/SiroBg" className="footer__socials-link">
            Github
          </a>
        </li>
        <li className="footer__socials-item">
          <a href="https://t.me/BorisGlinskiy" className="footer__socials-link">
            Telegram
          </a>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
