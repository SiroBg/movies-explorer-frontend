import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [beatfilmMoviesSearch, setBeatfilmMoviesSearch] = useState({});

  function onBeatfilmSearch({ searchValue }) {
    setShowResults(false);
    setIsMovieListLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setShowResults(true);
        setApiError(false);
        setBeatfilmMoviesSearch({ movies, searchValue });
        localStorage.setItem(
          'lastSearch',
          JSON.stringify({
            movies,
            searchValue,
          })
        );
      })
      .catch((err) => {
        setShowResults(true);
        setApiError(true);
        console.log(err);
      })
      .finally(() => setIsMovieListLoading(false));
  }

  return (
    <div className="app">
      <Switch>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Register />
        </Route>
        <Route path="/movies">
          <Movies
            showResults={showResults}
            setShowResults={setShowResults}
            isMovieListLoading={isMovieListLoading}
            apiError={apiError}
            searchedMovies={beatfilmMoviesSearch}
            onSearch={onBeatfilmSearch}
          />
        </Route>
        <Route path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
