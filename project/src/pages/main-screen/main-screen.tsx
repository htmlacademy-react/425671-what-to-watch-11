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
import { filmsOpenReset } from '../../store/action';


export default function MainScreen(): JSX.Element {
  const [films, isShowMore] = useAppSelector((state) => [state.films.slice(0, state.filmsOpen), state.films.length > state.filmsOpen] );
  const isFilmsDataLoading = useAppSelector((state) => state.isFilmsDataLoading);
  const isPromoFilmsDataLoading = useAppSelector((state) => state.isPromoFilmDataLoading);

  const dispatch = useAppDispatch();
  useEffect(() => () => { dispatch(filmsOpenReset()); }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>WTW</title>
      </Helmet>

      { isPromoFilmsDataLoading ? <FilmPromoLoading /> : <FilmPromo /> }

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList />

          { isFilmsDataLoading ? <LoadingSpinner /> : <FilmList films={films}/> }

          { isShowMore && <ShowMoreButton /> }
        </section>

        <Footer />
      </div>
    </>
  );
}
