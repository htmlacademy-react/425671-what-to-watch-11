import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { logoutAction } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus } from '../../сonst';

export default function UserBlock(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const authorizedUser = useAppSelector((state) => state.authorizedUser);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getSigned = () => (
    <div className="user-block">
      <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
    </div>
  );

  const getNotSigned = () => (
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

  return authorizationStatus !== AuthorizationStatus.Auth ? getSigned() : getNotSigned();
}

