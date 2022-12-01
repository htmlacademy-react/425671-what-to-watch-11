import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { postFavoriteStatusAction } from '../../store/api-actions';
import { getFavoritesFilms } from '../../store/films/selectors';
import { getIsAuthorized } from '../../store/user/selectors';
import { AppRoute } from '../../сonst';

type FilmButtonsProps = {
  filmId: number;
  isFavorite: boolean;
  promo?: boolean;
}

export default function FilmButtons({filmId, isFavorite, promo}: FilmButtonsProps): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const favoritesCount = useAppSelector(getFavoritesFilms);

  const handleClickFavorites = () => {
    if (isAuthorized) {
      dispatch(postFavoriteStatusAction({filmId: filmId, status: isFavorite ? 0 : 1}));
    } else {
      navigate(AppRoute.Login);
    }
  };

  const handleClickPlay = () => {
    navigate(`/player/${filmId}`);
  };

  return (
    <div className="film-card__buttons">
      <button className="btn btn--play film-card__button" type="button" onClick={handleClickPlay}>
        <svg viewBox="0 0 19 19" width="19" height="19">
          <use xlinkHref="#play-s"></use>
        </svg>
        <span>Play</span>
      </button>

      <button className="btn btn--list film-card__button" type="button" onClick={handleClickFavorites}>
        <svg viewBox="0 0 19 20" width="19" height="20">
          <use xlinkHref={`${isFavorite ? '#in-list' : '#add'}`}></use>
        </svg>
        <span>My list</span>
        { isAuthorized && <span className="film-card__count">{favoritesCount}</span> }
      </button>

      { !promo && isAuthorized && <Link to="review" className="btn film-card__button">Add review</Link> }
    </div>
  );
}
