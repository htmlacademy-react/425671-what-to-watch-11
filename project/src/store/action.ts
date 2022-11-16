import {createAction} from '@reduxjs/toolkit';
import { FilmType } from '../types/film-type';

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

