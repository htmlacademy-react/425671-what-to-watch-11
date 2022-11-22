const MORE_LIKE_THIS_COUNT = 4;
const FILMS_PER_PAGE = 8;
const DEFAULT_GENRE = 'All Genres';
const AUTH_TOKEN_KEY_NAME = 'guess-melody-token';

const BACKEND_URL = 'https://11.react.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

const enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
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
  Login = '/login',
  Logout = '/logout',
}

export {
  FILMS_PER_PAGE,
  MORE_LIKE_THIS_COUNT,
  DEFAULT_GENRE,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AUTH_TOKEN_KEY_NAME,
  AppRoute,
  APIRoute,
  AuthorizationStatus
};
