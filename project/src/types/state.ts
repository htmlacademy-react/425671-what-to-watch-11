import { store } from '../store';
import { AuthorizationStatus } from '../сonst';
import { CommentType } from './comment-type';
import { FilmType } from './film-type';
import { UserData } from './user-data';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserState = {
  authorizationStatus: AuthorizationStatus;
  authorizedUser: UserData | null;
};

export type FilmsState = {
  films: FilmType[];
  isLoading: boolean;
  currentGenre: string;
  filmsOpen: number;
};

export type OneFilmState = {
  film: FilmType | null;
  isLoading: boolean;
};

export type PromoFilmState = {
  film: FilmType | null;
  isLoading: boolean;
};

export type FilmCommentsState = {
  comments: CommentType[];
  isLoading: boolean;
};

export type SimilarFilmsState = {
  films: FilmType[];
  isLoading: boolean;
};

export type FavoritesState = {
  films: FilmType[];
  isLoading: boolean;
};
