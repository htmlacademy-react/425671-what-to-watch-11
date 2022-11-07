import { Link } from 'react-router-dom';

type FilmCardType = {
  id: number;
  name: string;
  previewImage: string;
};

export default function FilmCard({id, name, previewImage}: FilmCardType): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" id={id.toString()}>
      <div className="small-film-card__image">
        <img src={previewImage} alt={name} width="280" height="175" />
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}
