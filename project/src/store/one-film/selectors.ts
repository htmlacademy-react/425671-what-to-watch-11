import { FilmType } from '../../types/film-type';
import { State } from '../../types/state';
import { NameSpace } from '../../сonst';

export const getOneFilm = (state: State): FilmType | null => state[NameSpace.OneFilm].film;
export const getIsFilmLoading = (state: State): boolean => state[NameSpace.OneFilm].isLoading;
