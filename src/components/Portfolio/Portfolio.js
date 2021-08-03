function Portfolio() {
  return (
    <>
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__list">
        <li className="portfolio__item">
          <a
            href="https://github.com/SiroBg/how-to-learn"
            className="portfolio__link"
          >
            Статичный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/SiroBg/russian-travel"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
        </li>
        <li className="portfolio__item">
          <a
            href="https://github.com/SiroBg/react-mesto-api-full"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
        </li>
      </ul>
    </>
  );
}

export default Portfolio;
