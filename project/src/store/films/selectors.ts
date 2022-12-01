import { createSelector } from '@reduxjs/toolkit';
import { FilmType } from '../../types/film-type';
import { State } from '../../types/state';
import { DEFAULT_GENRE, NameSpace } from '../../сonst';

export const getFilms = (state: State): FilmType[] => state[NameSpace.Films].films;
export const getGenres = (state: State): string[] => [DEFAULT_GENRE, ...new Set(state[NameSpace.Films].films.map((film) => film.genre))].slice(0, 9);
export const getCurrentGenre = (state: State): string => state[NameSpace.Films].currentGenre;
export const getIsFilmsLoading = (state: State): boolean => state[NameSpace.Films].isLoading;
export const getFilmsOpened = (state: State): number => state[NameSpace.Films].filmsOpen;

export const getFilteredFilms = createSelector(
  [getFilms, getCurrentGenre],
  (films, genre) => {
    if (genre === DEFAULT_GENRE) {
      return films;
    }

    return films.filter((film) => film.genre === genre);
  }
);

export const getFavoritesFilms = (state: State): number => state[NameSpace.Films].films.filter((film) => film.isFavorite === true).length;
