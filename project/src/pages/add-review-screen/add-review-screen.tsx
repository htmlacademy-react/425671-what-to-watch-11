import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
import { BreadcrumbsItem } from '../../types/breadcrumbs-item';
import { FilmType } from '../../types/film-type';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AddReviewProps = {
  films: FilmType[];
}


export default function AddReviewScreen({films}: AddReviewProps): JSX.Element {
  const urlParams = useParams();
  const film: FilmType | undefined = films.find((item) => item.id === Number(urlParams.id));

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
          <img src={film.posterImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <UserBlock />
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} />
        </div>
      </div>

      <div className="add-review">
        <AddReviewForm textfieldBackground={film.backgroundColor}/>
      </div>

    </section>
  ) : <NotFoundScreen/>;
}
