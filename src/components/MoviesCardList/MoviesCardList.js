import MoviesCard from '../MoviesCard/MoviesCard';
import SearchForm from '../SearchForm/SearchForm';
import useMovieSearch from '../../hooks/useMovieSearch';
import { useState } from 'react';

function MoviesCardList({ getMovies, cardsType }) {
  const [showResults, setShowResults] = useState(false);

  const movieSearch = useMovieSearch();

  function onSearch({ searchValue }) {
    getMovies().then((res) => {
      setShowResults(true);
      movieSearch.sortSearchedMovies(res, searchValue);
    });
  }

  function renderMovies() {
    return movieSearch.shortMovieCheckBox
      ? movieSearch.filteredShortMovies
      : movieSearch.searchedMovies;
  }

  return (
    <>
      <SearchForm
        onSearch={onSearch}
        onCheckbox={movieSearch.setShortMovieCheckbox}
      />
      {showResults && (
        <ul className="movies-card-list">
          {renderMovies().map((movie) => (
            <MoviesCard key={movie.id} movie={movie} cardType={cardsType} />
          ))}
        </ul>
      )}
    </>
  );
}

export default MoviesCardList;
