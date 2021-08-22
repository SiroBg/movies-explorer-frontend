import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import InfoToolTip from '../InfoToolTip/InfoToolTip';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import handleMovieSearch from '../../utils/handleMovieSearch';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [beatfilmMoviesSearch, setBeatfilmMoviesSearch] = useState([]);
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoives, setSavedMovies] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const history = useHistory();
  const movieSearch = handleMovieSearch();

  useEffect(() => {
    checkToken();
    getInitialMovies();
  }, []);

  function resetResponseMessage() {
    setResponseMessage('');
  }

  function handleLogin(email, password) {
    setIsRequestLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        const jwt = res.token;
        localStorage.setItem('jwt', jwt);
        resetResponseMessage();
        setIsInfoTooltipOpen(true);
        setIsLoggedIn(true);
        getInitialData();
        history.push('/movies');
      })
      .catch((err) => {
        setResponseMessage(err.message);
        console.log(err);
      })
      .finally(() => setIsRequestLoading(false));
  }

  function handleRegister(name, email, password) {
    setIsRequestLoading(true);
    mainApi
      .register(name, email, password)
      .then(() => {
        handleLogin(email, password);
      })
      .catch((err) => {
        setResponseMessage(err.message);
        console.log(err);
      })
      .finally(() => setIsRequestLoading(false));
  }

  function handleUpdateUserInfo(name, email) {
    setIsRequestLoading(true);
    mainApi
      .updateUserInfo(name, email)
      .then((res) => {
        setCurrentUser(res);
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        setResponseMessage(err.message);
        console.log(err);
      })
      .finally(() => setIsRequestLoading(false));
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('lastSearch');
    setShowResults(false);
    setBeatfilmMoviesSearch([]);
    history.push('/');
  }

  function getInitialData() {
    mainApi.setToken();
    Promise.all([mainApi.getCurrentUserInfo(), mainApi.getSavedMovies()])
      .then((res) => {
        const [userInfo, movies] = res;
        setCurrentUser(userInfo);
        setSavedMovies(
          movies.filter((m) => {
            return m.owner === userInfo._id;
          })
        );
        setIsLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => console.log(err));
  }

  function getInitialMovies() {
    moviesApi
      .getMovies()
      .then((movies) => {
        setInitialMovies(movies);
        setApiError(false);
      })
      .catch((err) => {
        setInitialMovies([]);
        setShowResults(true);
        setApiError(true);
        console.log(err);
      });
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getInitialData();
    }
  }

  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
  }

  function onBeatfilmSearch(searchValue) {
    setShowResults(false);
    setIsMovieListLoading(true);
    setBeatfilmMoviesSearch(
      movieSearch.filterMoviesAndSetRightFormat(initialMovies, searchValue)
    );
    localStorage.setItem(
      'lastSearch',
      JSON.stringify({
        movies: movieSearch.filterMoviesAndSetRightFormat(
          initialMovies,
          searchValue
        ),
        value: searchValue,
      })
    );
    setIsMovieListLoading(false);
    setShowResults(true);
  }

  function getLastSearch() {
    const lastSearch = JSON.parse(localStorage.getItem('lastSearch'));
    if (lastSearch) {
      setShowResults(true);
      setBeatfilmMoviesSearch(lastSearch.movies);
    }
  }

  function removeMovieFromSaved(movie) {
    mainApi
      .removieMovieFromSaved(movie._id)
      .then(() => {
        setSavedMovies((res) => res.filter((m) => m._id !== movie._id));
      })
      .catch((err) => console.log(err));
  }

  function addMovie(movie) {
    mainApi
      .addMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMoives, res]);
      })
      .catch((err) => console.log(err));
  }

  function handleMovieAddBtn(movie) {
    const movieToDelete = savedMoives.find((m) => m.movieId === movie.movieId);
    !movieToDelete ? addMovie(movie) : removeMovieFromSaved(movieToDelete);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Switch>
          <Route path="/signin">
            <Login
              handleLogin={handleLogin}
              response={responseMessage}
              resetResponse={resetResponseMessage}
              isRequestLoading={isRequestLoading}
            />
          </Route>
          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              response={responseMessage}
              resetResponse={resetResponseMessage}
              isRequestLoading={isRequestLoading}
            />
          </Route>
          <ProtectedRoute path="/movies" isLoggedIn={isLoggedIn}>
            <Movies
              getLastSearch={getLastSearch}
              showResults={showResults}
              isMovieListLoading={isMovieListLoading}
              apiError={apiError}
              searchedMovies={beatfilmMoviesSearch}
              onSearch={onBeatfilmSearch}
              isLoggedIn={isLoggedIn}
              onMovieBtn={handleMovieAddBtn}
              savedMoives={savedMoives}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <SavedMovies
              isLoggedIn={isLoggedIn}
              searchedMovies={savedMoives}
              onMovieBtn={removeMovieFromSaved}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/profile" isLoggedIn={isLoggedIn}>
            <Profile
              isLoggedIn={isLoggedIn}
              onLogOut={handleLogOut}
              handleUpdateUserInfo={handleUpdateUserInfo}
              response={responseMessage}
              resetResponse={resetResponseMessage}
              isRequestLoading={isRequestLoading}
            />
          </ProtectedRoute>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
        <InfoToolTip isOpen={isInfoTooltipOpen} onClose={closeInfoToolTip} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
