import {createAction} from '@reduxjs/toolkit';

export const genreSet = createAction('film/genre/set', (genre: string) => ({
  payload: genre,
}));
export const genreReset = createAction('film/genre/reset');
