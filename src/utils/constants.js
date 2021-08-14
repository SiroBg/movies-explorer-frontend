const CLOSE_KEY = 'Escape';
const BASE_URL = 'https://api.nomoreparties.co';
const BASE_MAIN_URL = 'https://api.sirobg-movies.nomoredomains.club';
const SHORT_MOVIE_LENGTH = 40;
const DEVICE_SETTINGS = {
  desktop: { width: 1280, moviesAmount: 12, showStep: 3 },
  tablet: { width: 767, moviesAmount: 8, showStep: 2 },
  mobile: { width: 320, moviesAmount: 5, showStep: 1 },
};

export {
  BASE_URL,
  CLOSE_KEY,
  SHORT_MOVIE_LENGTH,
  DEVICE_SETTINGS,
  BASE_MAIN_URL,
};
