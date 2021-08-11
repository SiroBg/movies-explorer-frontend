import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
      <Header />
      <main className="movies">
        <SearchForm />
        <MoviesCardList cardsType="savedMovies" />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
