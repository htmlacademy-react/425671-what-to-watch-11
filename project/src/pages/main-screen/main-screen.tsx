import { Helmet } from 'react-helmet-async';
import FilmMainList from '../../components/film-main-list/film-main-list';
import FilmPromoLoading from '../../components/film-promo-loading/film-promo-loading';
import FilmPromo from '../../components/film-promo/film-promo';
import Footer from '../../components/footer/footer';
import { useAppSelector } from '../../hooks';
import { getIsPromoFilmLoading } from '../../store/promo-film/selectors';

export default function MainScreen(): JSX.Element {
  const isPromoFilmLoading = useAppSelector(getIsPromoFilmLoading);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>

      { isPromoFilmLoading ? <FilmPromoLoading /> : <FilmPromo /> }

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <FilmMainList />
        </section>
        <Footer />
      </div>
    </>
  );
}
