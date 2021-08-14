import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import moviesApi from '../../utils/MoviesApi';
import mainApi from '../../utils/MainApi';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [showResults, setShowResults] = useState(false);
  const [isMovieListLoading, setIsMovieListLoading] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [beatfilmMoviesSearch, setBeatfilmMoviesSearch] = useState({});

  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMoives, setSavedMovies] = useState([]);
  const [loginResponseMessage, setLoginResponseMessage] = useState('');
  const [registerResponseMessage, setRegisterResponseMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    checkToken();
  }, []);

  function handleLogin(email, password) {
    mainApi
      .login(email, password)
      .then((res) => {
        const jwt = res.token;
        localStorage.setItem('jwt', jwt);
        setLoginResponseMessage('ОК');
        setIsLoggedIn(true);
        history.push('/movies');
      })
      .catch((err) => {
        setLoginResponseMessage(err.message);
        console.log(err);
      });
  }

  function handleRegister(name, email, password) {
    mainApi
      .register(name, email, password)
      .then(() => {
        history.push('/signin');
        setRegisterResponseMessage('ОК');
      })
      .catch((err) => {
        setRegisterResponseMessage(err.message);
        console.log(err);
      });
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
    if (isLoggedIn) {
      history.push('/movies');
    }
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      getInitialData(jwt);
    }
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
              responseMessage={loginResponseMessage}
            />
          </Route>
          <Route path="/signup">
            <Register
              handleRegister={handleRegister}
              responseMessage={registerResponseMessage}
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
            <Profile isLoggedIn={isLoggedIn} />
          </ProtectedRoute>
          <Route exact path="/">
            <Main isLoggedIn={isLoggedIn} />
          </Route>
          <Route path="*">
            <NotFoundPage />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
