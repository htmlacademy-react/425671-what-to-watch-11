const MORE_LIKE_THIS_COUNT = 4;
const FILMS_PER_PAGE = 8;
const DEFAULT_GENRE = 'All Genres';

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
  Unknown = 'UNKNOWN',
}

enum APIRoute {
  Films = '/films',
  PromoFilm = '/promo',
}

export {
  FILMS_PER_PAGE,
  MORE_LIKE_THIS_COUNT,
  DEFAULT_GENRE,
  BACKEND_URL,
  REQUEST_TIMEOUT,
  AppRoute,
  APIRoute,
  AuthorizationStatus
};
