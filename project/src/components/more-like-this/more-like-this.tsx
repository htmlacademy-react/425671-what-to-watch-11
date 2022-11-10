import { FilmType } from '../../types/film-type';
import { MORE_LIKE_THIS_COUNT } from '../../сonst';
import FilmList from '../film-list/film-list';


type MoreLikeThisProps = {
  films: FilmType[];
  currentFilmId: number;
  genre: string;
}

export default function MoreLikeThis({films, currentFilmId, genre}: MoreLikeThisProps): JSX.Element {

  const moreFilms = films.filter((film) => film.id !== currentFilmId && film.genre === genre).slice(0, MORE_LIKE_THIS_COUNT);

  return (
    <FilmList films={moreFilms} />
  );
}
