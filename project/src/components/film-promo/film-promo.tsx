import { useAppSelector } from '../../hooks';
import FilmButtons from '../film-buttons/film-buttons';
import Header from '../header/header';
import UserBlock from '../user-block/user-block';


export default function FilmPromo(): JSX.Element {
  const {name, genre, released, backgroundImage, posterImage} = useAppSelector((state) => state.filmPromo);

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name} />
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header headerClass="film-card__head">
        <UserBlock />
      </Header>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <div className="film-card__poster">
            <img src={posterImage} alt={`${name} poster`} width="218" height="327" />
          </div>

          <div className="film-card__desc">
            <h2 className="film-card__title">{name}</h2>
            <p className="film-card__meta">
              <span className="film-card__genre">{genre}</span>
              <span className="film-card__year">{released}</span>
            </p>

            <FilmButtons />
          </div>
        </div>
      </div>
    </section>
  );
}
