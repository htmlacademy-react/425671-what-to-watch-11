import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { CommentType } from '../types/comment-type';
import { FilmType } from '../types/film-type';
import { NewCommentType } from '../types/new-comment';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { APIRoute, AppRoute, SIMILAR_FILMS_COUNT } from '../сonst';
import { redirectToRoute } from './action';


export const fetchFilmsAction = createAsyncThunk<FilmType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/films',
  async (_arg, {dispatch, extra: api}) => (await api.get<FilmType[]>(APIRoute.Films)).data,
);

export const fetchOneFilmAction = createAsyncThunk<FilmType, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/oneFilm',
  async (filmId, {dispatch, extra: api}) => (await api.get<FilmType>(`${APIRoute.Films}/${filmId}`)).data,
);

export const fetchPromoFilmAction = createAsyncThunk<FilmType, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/promo',
  async (_arg, {dispatch, extra: api}) => (await api.get<FilmType>(APIRoute.PromoFilm)).data,
);

export const fetchSimilarFilmsAction = createAsyncThunk<FilmType[], number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/currentFilm',
  async (filmId, {dispatch, extra: api}) =>
    (await api.get<FilmType[]>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`))
      .data
      .filter((film) => film.id !== filmId)
      .slice(0, SIMILAR_FILMS_COUNT),
);

export const fetchCommentsAction = createAsyncThunk<CommentType[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/currentFilm/comments',
  async (filmId, {dispatch, extra: api}) => (await api.get<CommentType[]>(`${APIRoute.Comments}/${filmId}`)).data,
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => (await api.get<UserData>(APIRoute.Login)).data,
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const { data } = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
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
  },
);

export const postCurrentFilmCommentAction = createAsyncThunk<void, {
  formData: NewCommentType;
  filmId: number;
  }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/post/currentFilm/newComment',
  async (formData, {dispatch, extra: api}) => {
    await api.post<CommentType[]>(`${APIRoute.Comments}/${formData.filmId}`, formData.formData);
    dispatch(redirectToRoute(`${AppRoute.Films}/${formData.filmId}`));
  }
);

export const fetchFavoritesAction = createAsyncThunk<FilmType[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/favorites',
  async (_arg, {dispatch, extra: api}) => (await api.get<FilmType[]>(APIRoute.Favorites)).data,
);

export const postFavoriteStatusAction = createAsyncThunk<FilmType, { filmId: number; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/post/favorites/status',
  async ({filmId, status}, { extra: api }) => (await api.post<FilmType>(`${APIRoute.Favorites}/${filmId}/${status}`)).data,
);
