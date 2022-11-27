import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizedUser, getIsAuthorized } from '../../store/user/selectors';
import { AppRoute } from '../../сonst';

export default function UserBlock(): JSX.Element {
  const isAuthorized = useAppSelector(getIsAuthorized);
  const authorizedUser = useAppSelector(getAuthorizedUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getNotSigned = () => (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
    </div>
  );

  const getSigned = () => (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar" onClick={() => navigate(AppRoute.MyList)}>
          <img src={authorizedUser?.avatarUrl} alt={authorizedUser?.name} width="63" height="63" />
        </div>
      </li>
      <li className="user-block__item">
        <Link
          to="/"
          className="user-block__link"
          onClick={(evt) => {
            evt.preventDefault();
            dispatch(logoutAction());
          }}
        >Sign out
        </Link>
      </li>
    </ul>
  );

  return isAuthorized ? getSigned() : getNotSigned();
}

