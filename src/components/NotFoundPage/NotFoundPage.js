import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1 className="not-found-page__title">
        <span className="not-found-page__error-code">404</span>
        Страница не найдена
      </h1>
      <Link to="/" className="not-found-page__link">
        Назад
      </Link>
    </main>
  );
}

export default NotFoundPage;
