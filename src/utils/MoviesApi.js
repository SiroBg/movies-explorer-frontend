import { baseUrl } from './constants';

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/beatfilm-movies`, {
      method: 'GET',
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const moviesApi = new MoviesApi(baseUrl);

export default moviesApi;
