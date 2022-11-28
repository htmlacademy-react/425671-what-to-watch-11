import { FilmType } from '../../types/film-type';
import { State } from '../../types/state';
import { NameSpace } from '../../сonst';

export const getPromoFilm = (state: State): FilmType | null => state[NameSpace.PromoFilm].film;
export const getIsPromoFilmLoading = (state: State): boolean => state[NameSpace.PromoFilm].isLoading;
