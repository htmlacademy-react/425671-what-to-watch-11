import { FilmType } from '../../types/film-type';
import { State } from '../../types/state';
import { NameSpace } from '../../сonst';

export const getFavorites = (state: State): FilmType[] => state[NameSpace.FavoritesFilms].films;
