import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';
import FilmPromoLoading from '../../components/film-promo-loading/film-promo-loading';
import FilmPromo from '../../components/film-promo/film-promo';
import Footer from '../../components/footer/footer';
import GenresList from '../../components/genres-list/genres-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filmsOpenReset } from '../../store/films/films';
import { getFilmsOpened, getFilteredFilms, getIsFilmsLoading } from '../../store/films/selectors';
import { getIsPromoFilmLoading } from '../../store/promo-film/selectors';


export default function MainScreen(): JSX.Element {
  const films = useAppSelector(getFilteredFilms);
  const filmsOpened = useAppSelector(getFilmsOpened);
  const isShowMore = films.length > filmsOpened;

  const isFilmsLoading = useAppSelector(getIsFilmsLoading);
  const isPromoFilmLoading = useAppSelector(getIsPromoFilmLoading);

  const dispatch = useAppDispatch();
  useEffect(() => () => { dispatch(filmsOpenReset()); }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>

      { isPromoFilmLoading ? <FilmPromoLoading /> : <FilmPromo /> }

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          { isFilmsLoading ? <LoadingSpinner /> : <FilmList films={films.slice(0, filmsOpened)}/> }

          { isShowMore && <ShowMoreButton /> }
        </section>

        <Footer />
      </div>
    </>
  );
}
