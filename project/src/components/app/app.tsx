import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AddReviewScreen from '../../pages/add-review-screen/add-review-screen';
import FilmScreen from '../../pages/film-screen/film-screen';
import MainScreen from '../../pages/main-screen/main-screen';
import MyListScreen from '../../pages/my-list/my-list-screen';
import PlayerScreen from '../../pages/player/player-screen';
import SignInScreen from '../../pages/sign-in-screen/sign-in-screen';
import { FilmType } from '../../types/film-type';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';
import ScrollToTop from '../scroll-to-top/scroll-to-top';
import { AppRoute, AuthorizationStatus } from '../../сonst';
import { HelmetProvider } from 'react-helmet-async';
import PrivateRoute from '../private-route/private-route';

type AppProps = {
  films: FilmType[];
  filmsCount: number;
  filmPromo: FilmType;
}

function App({films, filmsCount, filmPromo}: AppProps): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop/>
        <Routes>
          <Route path={AppRoute.Root} element={<MainScreen films={films.slice(0, filmsCount)} filmsCount={filmsCount} filmPromo={filmPromo}/>} />
          <Route path={AppRoute.Login} element={<SignInScreen/>} />
          <Route path={AppRoute.MyList} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Unknown}>
              <MyListScreen myFilms={films}/>
            </PrivateRoute>
          }
          />
          <Route path={AppRoute.Film} element={<FilmScreen films={films}/>} />
          {/* <Route path={AppRoute.AddReview} element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Unknown}>
              <Route path={AppRoute.AddReview} element={<AddReviewScreen films={films}/>} />
            </PrivateRoute>
          }
          /> */}
          <Route path={AppRoute.AddReview} element={<AddReviewScreen films={films}/>}/>
          <Route path={AppRoute.Player} element={<PlayerScreen/>} />
          <Route path="*" element={<NotFoundScreen/>}/>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
