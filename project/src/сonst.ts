const SIMILAR_FILMS_COUNT = 4;
const FILMS_PER_PAGE = 8;
const DEFAULT_GENRE = 'All Genres';
const AUTH_TOKEN_KEY_NAME = 'wtw-token';
const MIN_COMMENT_LENGTH = 50;
const MAX_COMMENT_LENGTH = 400;

const BACKEND_URL = 'https://11.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Films = '/films',
  CurrentFilm = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

const enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

enum APIRoute {
  Films = '/films',
  PromoFilm = '/promo',
  Similar = '/similar',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
  Favorites = '/favorite',
}

enum NameSpace {
  FavoritesFilms = 'FAVORITESFILMS',
  SimilarFilms = 'SIMILARFILMS',
  Comments = 'COMMENTS',
  PromoFilm = 'PROMOFILM',
  OneFilm = 'ONEFILM',
  Films = 'FILMS',
  User = 'USER',
}

export {
  FILMS_PER_PAGE,
  SIMILAR_FILMS_COUNT,
  DEFAULT_GENRE,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  AppRoute,
  APIRoute,
  AuthorizationStatus,
  NameSpace
};
