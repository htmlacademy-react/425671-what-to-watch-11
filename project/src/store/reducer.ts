import {createReducer} from '@reduxjs/toolkit';
import {filmsOpenAdd, filmsOpenReset, genreReset, genreSet} from './action';
import filmsMock from '../mock/films.json'; //temp films database
import { DEFAULT_GENRE, FILMS_PER_PAGE } from '../сonst';

const makeGenres = () => {
  const genres = new Set<string>();
  genres.add(DEFAULT_GENRE);
  filmsMock.forEach((film) => genres.add(film.genre));
  return [...genres];
};

const initialState = {
  films: filmsMock,
  filmPromo: filmsMock[15],
  genres: makeGenres(),
  currentGenre: DEFAULT_GENRE,
  filmsOpen: FILMS_PER_PAGE,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(genreSet, (state, action) => {
      state.currentGenre = action.payload;
      state.films = filmsMock.filter((film) => film.genre === action.payload);
    })
    .addCase(genreReset, (state) => {
      state.currentGenre = DEFAULT_GENRE;
      state.films = filmsMock;
    })
    .addCase(filmsOpenAdd, (state) => {
      state.filmsOpen += FILMS_PER_PAGE;
    })
    .addCase(filmsOpenReset, (state) => {
      state.filmsOpen = FILMS_PER_PAGE;
    });
});

export {reducer};
