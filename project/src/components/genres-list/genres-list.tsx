import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filmsOpenReset, genreReset, genreSet } from '../../store/action';
import { DEFAULT_GENRE } from '../../сonst';


export default function GenresList(): JSX.Element {
  const [genres,currentGenre] = useAppSelector((state) => [state.genres, state.currentGenre]);
  const dispatch = useAppDispatch();
  useEffect(() => { dispatch(filmsOpenReset()); }, [dispatch, currentGenre]);

  const getListItem = (genreName: string, active: boolean) => (
    <li key={`genre-${genreName}`}className={active ? 'catalog__genres-item catalog__genres-item--active' : 'catalog__genres-item'}>
      <a href="/#" className="catalog__genres-link"
        onClick={
          (event) => {
            event.preventDefault();
            genreName === DEFAULT_GENRE ? dispatch(genreReset()) : dispatch(genreSet(genreName));
          }
        }
      >{genreName}
      </a>
    </li>
  );

  return (
    <ul className="catalog__genres-list">
      { genres.map((genre) => getListItem(genre, (genre === currentGenre))) }
    </ul>
  );
}
