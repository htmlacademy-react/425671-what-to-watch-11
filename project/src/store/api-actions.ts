import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { dropToken, getToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { CommentType } from '../types/comment-type';
import { FilmType } from '../types/film-type';
import { NewCommentType } from '../types/new-comment';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';
import { APIRoute, AppRoute, AuthorizationStatus, SIMILAR_FILMS_COUNT } from '../сonst';
import { loadCurrentFilm, loadCurrentFilmComments, loadFilms, loadPromoFilm, loadSimilarFilms, redirectToRoute, requireAuthorization, resetAuthorizedUser, setAuthorizedUser, setCurrentFilmCommentsLoading, setFilmsDataLoading, setPromoFilmDataLoading, setSimilarFilmsLoading } from './action';


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

export const fetchCurrentFilmAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/currentFilm',
  async (filmId, {dispatch, extra: api}) => {
    dispatch(setFilmsDataLoading(true));
    const { data } = await api.get<FilmType>(`${APIRoute.Films}/${filmId}`);
    dispatch(setFilmsDataLoading(false));
    dispatch(loadCurrentFilm(data));
  }
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

export const fetchSimilarFilmsAction = createAsyncThunk<void, number, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/currentFilm',
  async (filmId, {dispatch, extra: api}) => {
    try {
      dispatch(setSimilarFilmsLoading(true));
      const similarFilms =
        (await api.get<FilmType[]>(`${APIRoute.Films}/${filmId}${APIRoute.Similar}`))
          .data
          .filter((film) => film.id !== filmId)
          .slice(0, SIMILAR_FILMS_COUNT);

      dispatch(setSimilarFilmsLoading(false));
      dispatch(loadSimilarFilms(similarFilms));
    } catch (error) {
      dispatch(setSimilarFilmsLoading(false));
    }
  }
);

export const fetchCurrentilmCommentsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetch/currentFilm/comments',
  async (filmId, {dispatch, extra: api}) => {
    dispatch(setCurrentFilmCommentsLoading(true));
    const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${filmId}`);
    dispatch(setCurrentFilmCommentsLoading(false));
    dispatch(loadCurrentFilmComments(data));
  }
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
