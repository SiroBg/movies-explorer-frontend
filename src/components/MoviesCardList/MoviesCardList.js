import defaultMovies from '../../utils/defaultMovies';

import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies, cardsType }) {
  return (
    <ul className="movies-card-list">
      {defaultMovies.map((movie) => (
        <MoviesCard key={movie.id} movie={movie} cardType={cardsType} />
      ))}
    </ul>
  );
}

export default MoviesCardList;
