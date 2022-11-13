const MORE_LIKE_THIS_COUNT = 4;
const DEFAULT_GENRE = 'All Genres';

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

export {
  MORE_LIKE_THIS_COUNT,
  DEFAULT_GENRE,
  AppRoute,
  AuthorizationStatus
};
