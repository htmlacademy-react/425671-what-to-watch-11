import {Navigate} from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user/selectors';
import {AppRoute, AuthorizationStatus} from '../../сonst';
import LoadingSpinner from '../loading-spinner/loading-spinner';

type PrivateRouteProps = {
  children: JSX.Element;
}

export default function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {children} = props;

  if(authorizationStatus === AuthorizationStatus.Unknown){
    return (<LoadingSpinner />);
  }

  return (
    authorizationStatus === AuthorizationStatus.Auth ? children : <Navigate to={AppRoute.Login} />
  );
}
