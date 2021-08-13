import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import moviesApi from '../../utils/MoviesApi';

function Movies() {
  function getMovies() {
    return moviesApi.getMovies();
  }

  return (
    <>
      <Header />
      <main className="movies">
        <MoviesCardList getMovies={getMovies} />
        <button className="movies__button" type="button">
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
}

export default Movies;
