export const enum AppRoute {
  Root = '/',
  Login = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

export const enum AuthorizationStatus {
  Auth = 'AUTH',
  Unknown = 'UNKNOWN',
}
