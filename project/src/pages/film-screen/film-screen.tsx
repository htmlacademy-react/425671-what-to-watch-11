import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import FilmButtons from '../../components/film-buttons/film-buttons';
import FilmDescription from '../../components/film-description/film-description';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import MoreLikeThis from '../../components/more-like-this/more-like-this';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneFilmAction } from '../../store/api-actions';
import { getIsFilmLoading, getOneFilm } from '../../store/one-film/selectors';
import { FilmType } from '../../types/film-type';
import NotFoundScreen from '../not-found-screen/not-found-screen';


export default function FilmScreen(): JSX.Element {
  const urlParams = useParams();
  const dispatch = useAppDispatch();

  const film: FilmType | null = useAppSelector(getOneFilm);
  const isLoading: boolean = useAppSelector(getIsFilmLoading);

  useEffect(() => {
    if (urlParams.id && film?.id.toString() !== urlParams.id) {
      dispatch(fetchOneFilmAction(urlParams.id));
    }
  }, [dispatch, film?.id, urlParams.id]);

  if(isLoading && film?.id.toString() !== urlParams.id){
    return <LoadingSpinner />;
  }

  return film ? (
    <>
      <Helmet>
        <title>WTW: {film.name}</title>
      </Helmet>
      <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            { isLoading ? '' : <img src={film.backgroundImage} alt={film.name} />}
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

              <FilmButtons />
            </div>
          </div>
        </div>

        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            { isLoading ?
              <div className="film-card__poster film-card__poster--big" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              >
                <LoadingSpinner />
              </div> :
              <div className="film-card__poster film-card__poster--big">
                <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
              </div> }

            { isLoading ?
              <div style={{
                flexGrow: '1',
                alignSelf: 'center'
              }}
              >
                <LoadingSpinner />
              </div> :
              <FilmDescription film={film} /> }

          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <MoreLikeThis currentFilmId={film.id} />

        </section>

        <Footer />
      </div>
    </>
  ) : <NotFoundScreen/>;
}
