import Header from '../Header/Header';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({ isLoggedIn, searchedMovies }) {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="movies">
        <MoviesCardList
          moviesType="savedMovies"
          searchedMovies={searchedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
