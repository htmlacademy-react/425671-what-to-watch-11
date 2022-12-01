import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../сonst';
import { favorites } from './favorites/favorites';
import { filmComments } from './film-comments/film-comments';
import { films } from './films/films';
import { oneFilm } from './one-film/one-film';
import { promoFilm } from './promo-film/promo-film';
import { similarFilms } from './similar-films/similar-films';
import { user } from './user/user';


export const rootReducer = combineReducers({
  [NameSpace.User]: user.reducer,
  [NameSpace.Films]: films.reducer,
  [NameSpace.OneFilm]: oneFilm.reducer,
  [NameSpace.PromoFilm]: promoFilm.reducer,
  [NameSpace.Comments]: filmComments.reducer,
  [NameSpace.SimilarFilms]: similarFilms.reducer,
  [NameSpace.FavoritesFilms]: favorites.reducer,
});
