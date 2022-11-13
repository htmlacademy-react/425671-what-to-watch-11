import { FilmType } from '../../types/film-type';
import FilmCard from '../film-card/film-card';

export default function FilmList({films}: {films: FilmType[]}): JSX.Element {
  return (
    <div className="catalog__films-list">
      { films.map((film) => <FilmCard key={`mcf-${film.id}`} id={film.id} name={film.name} previewImage={film.previewImage} previewVideoLink={film.previewVideoLink} />) }
    </div>
  );

}
