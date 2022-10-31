import { FilmType } from '../../types/film-type';
import FilmCard from '../film-card/film-card';
import { BaseSyntheticEvent, useState } from 'react';

export type FilmListPropsType = {
  films: FilmType[];
}

export default function FilmList({films}: FilmListPropsType): JSX.Element {

  const [, setActiveId] = useState<string | null>(null);

  const handleMouseOver = (evt: BaseSyntheticEvent) => {
    const target = evt.target as Element;
    const parent = target.parentElement as Element;
    if (parent.classList.contains('small-film-card') || target.tagName === 'A') {
      setActiveId(parent.id);
    } else {
      setActiveId(null);
    }
  };

  return (
    <div className="catalog__films-list" onMouseOver={handleMouseOver} onMouseOut={() => setActiveId(null)}>
      { films.map((film) => <FilmCard key={`mcf-${film.id}`} id={film.id} name={film.name} previewImage={film.previewImage} />) }
    </div>
  );

}
