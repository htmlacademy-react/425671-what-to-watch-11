import MainScreen from '../../pages/main-screen/main-screen';
import { FilmType } from '../../types/film-type';

type AppProps = {
  films: FilmType[];
  filmsCount: number;
  filmPromo: FilmType;
}

function App({films, filmsCount, filmPromo}: AppProps): JSX.Element {
  return (
    <MainScreen films={films} filmsCount={filmsCount} filmPromo={filmPromo}/>
  );
}

export default App;
