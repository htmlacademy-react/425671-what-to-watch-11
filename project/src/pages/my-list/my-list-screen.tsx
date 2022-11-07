import { Helmet } from 'react-helmet-async';
import FilmList from '../../components/film-list/film-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import { FilmType } from '../../types/film-type';

type MyListScreenProps = {
  myFilms: FilmType[];
}

export default function MyListScreen({myFilms}: MyListScreenProps): JSX.Element {
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
