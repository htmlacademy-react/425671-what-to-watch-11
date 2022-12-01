import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchFavoritesAction } from '../../store/api-actions';
import { getFavorites } from '../../store/favorites/selectors';

export default function MyListScreen(): JSX.Element {
  const myFilms = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  useEffect(
    () => {
      dispatch(fetchFavoritesAction());
    }, [dispatch]
  );

  return (
    <div className="user-page">
      <Helmet>
        <title>WTW: My Film List</title>
      </Helmet>
      <Header headerClass='user-page__head'>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{myFilms.length}</span></h1>
        <UserBlock />
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList films={myFilms} />
      </section>

      <Footer />
    </div>
  );
}
