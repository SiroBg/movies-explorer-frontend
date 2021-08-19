const CLOSE_KEY = 'Escape';
const BASE_URL = 'https://api.nomoreparties.co';
const BASE_MAIN_URL = 'https://api.sirobg-movies.nomoredomains.club';
const SHORT_MOVIE_LENGTH = 40;
const DEVICE_SETTINGS = {
  desktop: { width: 1280, moviesAmount: 12, showStep: 3 },
  tablet: { width: 767, moviesAmount: 8, showStep: 2 },
  mobile: { width: 320, moviesAmount: 5, showStep: 1 },
};
const NAME_REGEXP = /^[A-Za-zА-Яа-я-\sёЁ]{2,30}$/;
const TRAILER_LINK_PLACEHOLDER =
  'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley';

export {
  BASE_URL,
  CLOSE_KEY,
  SHORT_MOVIE_LENGTH,
  DEVICE_SETTINGS,
  BASE_MAIN_URL,
  NAME_REGEXP,
  TRAILER_LINK_PLACEHOLDER,
};
