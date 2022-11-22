import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropToken, getToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { FilmType } from '../types/film-type';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { APIRoute, AppRoute, AuthorizationStatus } from '../сonst';
import { loadFilms, loadPromoFilm, redirectToRoute, requireAuthorization, resetAuthorizedUser, setAuthorizedUser, setFilmsDataLoading, setPromoFilmDataLoading } from './action';


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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    if(getToken()) {
      try {
        const response = await api.get<UserData>(APIRoute.Login);
        dispatch(setAuthorizedUser(response.data));
        dispatch(requireAuthorization(AuthorizationStatus.Auth));
      } catch {
        dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      }
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const response = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(response.data.token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setAuthorizedUser(response.data));
    dispatch(redirectToRoute(AppRoute.Root));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(resetAuthorizedUser());
  },
);
