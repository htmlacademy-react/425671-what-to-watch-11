import {createAction} from '@reduxjs/toolkit';
import { FilmType } from '../types/film-type';
import { UserData } from '../types/user-data';
import { AppRoute, AuthorizationStatus } from '../сonst';

export const genreSet = createAction('film/genre/set', (genre: string) => ({
  payload: genre,
}));
export const genreReset = createAction('film/genre/reset');
export const filmsOpenAdd = createAction('film/showMore/add');
export const filmsOpenReset = createAction('film/showMore/reset');

export const loadFilms = createAction<FilmType[]>('data/load/films');
export const setFilmsDataLoading = createAction<boolean>('data/load/films/loadingStatus');

export const loadPromoFilm = createAction<FilmType>('data/load/promo');
export const setPromoFilmDataLoading = createAction<boolean>('data/load/promo/loadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setAuthorizedUser = createAction<UserData>('user/setAuthorizedUser');
export const resetAuthorizedUser = createAction('user/resetAuthorizedUser');

export const redirectToRoute = createAction<AppRoute>('common/redirectToRoute');
