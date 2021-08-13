const closeKey = 'Escape';
const baseUrl = 'https://api.nomoreparties.co';
const shortMovieLength = 40;
const deviceSettings = {
  desktop: { width: 1280, moviesAmount: 12, showStep: 3 },
  tablet: { width: 767, moviesAmount: 8, showStep: 2 },
  mobile: { width: 320, moviesAmount: 5, showStep: 1 },
};

export { baseUrl, closeKey, shortMovieLength, deviceSettings };
