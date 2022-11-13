import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';
import FilmPromo from '../../components/film-promo/film-promo';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import { useAppSelector } from '../../hooks';


export default function MainScreen(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const filmPromo = films[15];

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>
      <FilmPromo {...filmPromo}/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          <FilmList films={films}/>

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
