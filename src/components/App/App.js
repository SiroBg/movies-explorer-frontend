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

function App() {
  const [showResults, setShowResults] = useState(false);
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [beatfilmMoviesSearch, setBeatfilmMoviesSearch] = useState({});
  const [isRequestLoading, setIsRequestLoading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoives, setSavedMovies] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  function resetResponseMessage() {
    setResponseMessage('');
  }

  function handleLogin(email, password) {
    setIsRequestLoading(true);
    mainApi
      .login(email, password)
      .then((res) => {
        console.log(isRequestLoading);
        const jwt = res.token;
        localStorage.setItem('jwt', jwt);
        resetResponseMessage();
        setIsInfoTooltipOpen(true);
        setIsLoggedIn(true);
        getInitialData(jwt);
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
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      setIsRequestLoading(true);
      return mainApi
        .updateUserInfo(name, email, jwt)
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
    setResponseMessage('Авторизуйтесь.');
  }

  function handleLogOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('jwt');
    localStorage.removeItem('lastSearch');
    history.push('/');
  }

  function getInitialData(jwt) {
    Promise.all([mainApi.getCurrentUserInfo(jwt), mainApi.getSavedMovies(jwt)])
      .then((res) => {
        const [userInfo, movies] = res;
        setCurrentUser(userInfo);
        setSavedMovies(movies);
      })
      .catch((err) => console.log(err));
  }

  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getInitialData(jwt);
      setIsLoggedIn(true);
      history.push('/movies');
    }
  }

  function closeInfoToolTip() {
    setIsInfoTooltipOpen(false);
  }

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
              showResults={showResults}
              setShowResults={setShowResults}
              isMovieListLoading={isMovieListLoading}
              apiError={apiError}
              searchedMovies={beatfilmMoviesSearch}
              onSearch={onBeatfilmSearch}
              isLoggedIn={isLoggedIn}
            />
          </ProtectedRoute>
          <ProtectedRoute path="/saved-movies" isLoggedIn={isLoggedIn}>
            <SavedMovies isLoggedIn={isLoggedIn} />
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
