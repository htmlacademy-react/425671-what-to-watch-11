import {Route, Routes} from 'react-router-dom';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list/my-list-screen';
import PlayerScreen from '../../pages/player/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoute } from '../../сonst';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router';
import browserHistory from '../../browser-history';
import { store } from '../../store';
import { fetchFilmsAction, fetchPromoFilmAction } from '../../store/api-actions';


function App(): JSX.Element {
  store.dispatch(fetchPromoFilmAction());
  store.dispatch(fetchFilmsAction());

  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <ScrollToTop/>
        <Routes>
          <Route path={AppRoute.Root} element={<MainScreen />} />
          <Route path={AppRoute.Login} element={<SignInScreen/>} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute>
              <MyListScreen />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.CurrentFilm} element={<FilmScreen />} />
          <Route path={AppRoute.AddReview} element={
            <PrivateRoute>
              <AddReviewScreen />
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Player} element={<PlayerScreen/>} />
          <Route path="*" element={<NotFoundScreen/>}/>
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}

export default App;
