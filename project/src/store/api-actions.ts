import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { FilmType } from '../types/film-type';
import { AppDispatch, State } from '../types/state';
import { APIRoute } from '../сonst';
import { loadFilms, loadPromoFilm, setFilmsDataLoading, setPromoFilmDataLoading } from './action';


export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/films',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoading(true));
    const {data} = await api.get<FilmType[]>(APIRoute.Films);
    dispatch(setFilmsDataLoading(false));
    dispatch(loadFilms(data));
  },
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/promo',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setPromoFilmDataLoading(true));
    const {data} = await api.get<FilmType>(APIRoute.PromoFilm);
    dispatch(setPromoFilmDataLoading(false));
    dispatch(loadPromoFilm(data));
  },
);
