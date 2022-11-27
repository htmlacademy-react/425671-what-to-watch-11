import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getIsAuthorized } from '../../store/user/selectors';

export default function FilmButtons(): JSX.Element {
  const urlParams = useParams();
  const isAuthorized = useAppSelector(getIsAuthorized);

  return (
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
      { urlParams.id && isAuthorized && <Link to="review" className="btn film-card__button">Add review</Link> }
    </div>
  );
}
