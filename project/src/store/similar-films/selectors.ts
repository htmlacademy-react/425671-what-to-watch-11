import { FilmType } from '../../types/film-type';
import { State } from '../../types/state';
import { NameSpace } from '../../сonst';

export const getSimilarFilms = (state: State): FilmType[] => state[NameSpace.SimilarFilms].films;
export const getIsSimilarFilmsLoading = (state: State): boolean => state[NameSpace.SimilarFilms].isLoading;
