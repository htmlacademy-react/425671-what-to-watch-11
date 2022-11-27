import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Header from '../../components/header/header';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import UserBlock from '../../components/user-block/user-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOneFilmAction } from '../../store/api-actions';
import { getIsFilmLoading, getOneFilm } from '../../store/one-film/selectors';
import { BreadcrumbsItem } from '../../types/breadcrumbs-item';
import { FilmType } from '../../types/film-type';
import NotFoundScreen from '../not-found-screen/not-found-screen';


export default function AddReviewScreen(): JSX.Element {
  const urlParams = useParams();
  const dispatch = useAppDispatch();

  const film: FilmType | null = useAppSelector(getOneFilm);
  const isLoading: boolean = useAppSelector(getIsFilmLoading) || film?.id.toString() !== urlParams.id;

  useEffect(() => {
    if (urlParams.id && film?.id.toString() !== urlParams.id) {
      dispatch(fetchOneFilmAction(urlParams.id));
    }
  }, [dispatch, film?.id, urlParams.id]);


  const breadcrumbs: BreadcrumbsItem[] = [];
  if(film){
    breadcrumbs.push({id: 1, title: film.name, ref: `/films/${film.id}/`});
    breadcrumbs.push({id: 2, title: 'Add review'});
  }

  return film ? (
    <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
      <Helmet>
        <title>WTW: {film.name} — Add review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          { isLoading ? '' : <img src={film.backgroundImage} alt={film.name} />}
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <UserBlock />
        </Header>

        { isLoading ?
          <div className="film-card__poster film-card__poster--small" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          >
            <LoadingSpinner />
          </div> :
          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterImage} alt={film.name} />
          </div> }
      </div>

      <div className="add-review">
        <AddReviewForm filmId={film.id} textfieldBackground={film.backgroundColor}/>
      </div>

    </section>
  ) : <NotFoundScreen/>;
}
