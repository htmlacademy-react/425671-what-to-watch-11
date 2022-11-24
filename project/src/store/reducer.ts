import {createReducer} from '@reduxjs/toolkit';
import {filmsOpenAdd, filmsOpenReset, genreReset, genreSet, loadCurrentFilm, loadFilms, loadPromoFilm, loadSimilarFilms, requireAuthorization, resetAuthorizedUser, setAuthorizedUser, setFilmsDataLoading, setPromoFilmDataLoading, setSimilarFilmsLoading} from './action';
import { AuthorizationStatus, DEFAULT_GENRE, FILMS_PER_PAGE } from '../сonst';
import { FilmType } from '../types/film-type';
import { makeGenres } from '../utils';
import { UserData } from '../types/user-data';


type InitalState = {
  films: FilmType[];
  filmsOrigin: FilmType[];
  currentFilm: FilmType | null;
  isFilmsDataLoading: boolean;
  similarFilms: FilmType[];
  isSimilarFilmsLoading: boolean;
  promoFilm: FilmType | null;
  isPromoFilmDataLoading: boolean;
  genres: string[];
  currentGenre: string;
  filmsOpen: number;
  authorizationStatus: AuthorizationStatus;
  authorizedUser: UserData | null;
}

const initialState: InitalState = {
  films: [],
  filmsOrigin: [],
  currentFilm: null,
  isFilmsDataLoading: true,
  similarFilms: [],
  isSimilarFilmsLoading: true,
  promoFilm: null,
  isPromoFilmDataLoading: true,
  genres: [],
  currentGenre: DEFAULT_GENRE,
  filmsOpen: FILMS_PER_PAGE,
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizedUser: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreSet, (state, action) => {
      state.currentGenre = action.payload;
      state.films = state.filmsOrigin.filter((film) => film.genre === action.payload);
    })
    .addCase(genreReset, (state) => {
      state.currentGenre = DEFAULT_GENRE;
      state.films = state.filmsOrigin;
    })
    .addCase(filmsOpenAdd, (state) => {
      state.filmsOpen += FILMS_PER_PAGE;
    })
    .addCase(filmsOpenReset, (state) => {
      state.filmsOpen = FILMS_PER_PAGE;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
      state.filmsOrigin = action.payload;
      state.genres = makeGenres(action.payload);
    })
    .addCase(loadCurrentFilm, (state, action) => {
      state.currentFilm = action.payload;
    })
    .addCase(setFilmsDataLoading, (state, action) => {
      state.isFilmsDataLoading = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(setSimilarFilmsLoading, (state, action) => {
      state.isSimilarFilmsLoading = action.payload;
    })
    .addCase(loadPromoFilm, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setPromoFilmDataLoading, (state, action) => {
      state.isPromoFilmDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setAuthorizedUser, (state, action) => {
      state.authorizedUser = action.payload;
    })
    .addCase(resetAuthorizedUser, (state) => {
      state.authorizedUser = null;
    });
});

export {reducer};
