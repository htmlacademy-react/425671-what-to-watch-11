import { useEffect } from 'react';
import GenresList from '../../components/genres-list/genres-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import ShowMoreButton from '../../components/show-more-button/show-more-button';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { filmsOpenReset } from '../../store/films/films';
import { getFilmsOpened, getFilteredFilms, getIsFilmsLoading } from '../../store/films/selectors';
import FilmList from '../film-list/film-list';

export default function FilmMainList(): JSX.Element {
  const films = useAppSelector(getFilteredFilms);
  const filmsOpened = useAppSelector(getFilmsOpened);
  const isShowMore = films.length > filmsOpened;
  const isFilmsLoading = useAppSelector(getIsFilmsLoading);

  const dispatch = useAppDispatch();
  useEffect(() => () => { dispatch(filmsOpenReset()); }, [dispatch]);

  return (
    <>
      <GenresList />
      { isFilmsLoading ? <LoadingSpinner /> : <FilmList films={films.slice(0, filmsOpened)}/> }
      { isShowMore && <ShowMoreButton /> }
    </>
  );
}
