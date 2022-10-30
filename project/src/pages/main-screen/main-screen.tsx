import { Helmet } from 'react-helmet-async';
import FilmCard from '../../components/film-card/film-card';
import FilmPromo from '../../components/film-promo/film-promo';
import Footer from '../../components/footer/footer';
import { FilmType } from '../../types/film-type';

type MainScreenProps = {
  films: FilmType[];
  filmsCount: number;
  filmPromo: FilmType;
}

export default function MainScreen({films, filmsCount, filmPromo}: MainScreenProps): JSX.Element {
  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      <FilmPromo {...filmPromo}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <ul className="catalog__genres-list">
            <li className="catalog__genres-item catalog__genres-item--active">
              <a href="\#" className="catalog__genres-link">All genres</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Comedies</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Crime</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Documentary</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Dramas</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Horror</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Kids & Family</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Romance</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Sci-Fi</a>
            </li>
            <li className="catalog__genres-item">
              <a href="\#" className="catalog__genres-link">Thrillers</a>
            </li>
          </ul>

          <div className="catalog__films-list">
            { films.map((film) => <FilmCard key={`mcf-${film.id}`} id={film.id} name={film.name} previewImage={film.previewImage} />) }
          </div>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
