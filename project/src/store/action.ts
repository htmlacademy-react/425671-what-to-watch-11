import {createAction} from '@reduxjs/toolkit';
import { CommentType } from '../types/comment-type';
import { FilmType } from '../types/film-type';
import { UserData } from '../types/user-data';
import { AuthorizationStatus } from '../сonst';

export const genreSet = createAction('film/genre/set', (genre: string) => ({
  payload: genre,
}));
export const genreReset = createAction('film/genre/reset');
export const filmsOpenAdd = createAction('film/showMore/add');
export const filmsOpenReset = createAction('film/showMore/reset');

export const loadFilms = createAction<FilmType[]>('data/load/films');
export const loadCurrentFilm = createAction<FilmType>('data/load/currentFilm');
export const setFilmsDataLoading = createAction<boolean>('data/load/films/loadingStatus');

export const loadCurrentFilmComments = createAction<CommentType[]>('data/load/currentFilm/comments');
export const setCurrentFilmCommentsLoading = createAction<boolean>('data/load/currentFilm/comments/loadingStatus');

export const loadSimilarFilms = createAction<FilmType[]>('data/load/similarFilms');
export const setSimilarFilmsLoading = createAction<boolean>('data/load/similarFilms/loadingStatus');

export const loadPromoFilm = createAction<FilmType>('data/load/promo');
export const setPromoFilmDataLoading = createAction<boolean>('data/load/promo/loadingStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
export const setAuthorizedUser = createAction<UserData>('user/setAuthorizedUser');
export const resetAuthorizedUser = createAction('user/resetAuthorizedUser');

export const redirectToRoute = createAction<string>('common/redirectToRoute');
