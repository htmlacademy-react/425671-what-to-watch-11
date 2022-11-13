import {createReducer} from '@reduxjs/toolkit';
import {genreReset, genreSet} from './action';
import filmsMock from '../mock/films.json'; //temp films database
import { DEFAULT_GENRE } from '../сonst';

const makeGenres = () => {
  const genres = new Set<string>();
  genres.add(DEFAULT_GENRE);
  filmsMock.forEach((film) => genres.add(film.genre));
  return [...genres];
};

const initialState = {
  films: filmsMock,
  genres: makeGenres(),
  currentGenre: DEFAULT_GENRE,
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
    });
});

export {reducer};
