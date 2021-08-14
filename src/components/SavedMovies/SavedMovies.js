import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isLoggedIn }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="movies">
        <MoviesCardList moviesType="savedMovies" />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
