import { Helmet } from 'react-helmet-async';
import { Link, useParams } from 'react-router-dom';
import FilmDescription from '../../components/film-description/film-description';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import MoreLikeThis from '../../components/more-like-this/more-like-this';
import UserBlock from '../../components/user-block/user-block';
import { FilmType } from '../../types/film-type';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type FilmScreenProps ={
  films: FilmType[];
}

export default function FilmScreen({films}: FilmScreenProps): JSX.Element {
  const urlParams = useParams();
  const film:FilmType|undefined = films.find((item) => item.id === Number(urlParams.id));

  return film ? (
    <>
      <Helmet>
        <title>WTW: {film.name}</title>
      </Helmet>
      <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.posterImage} alt={film.name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header headerClass='film-card__head'>
            <UserBlock />
          </Header>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to="review" className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
            </div>

            <FilmDescription film={film} />
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoreLikeThis films={films} currentFilmId={film.id} genre={film.genre} />

        </section>

        <Footer />
      </div>
    </>
  ) : <NotFoundScreen/>;
}
