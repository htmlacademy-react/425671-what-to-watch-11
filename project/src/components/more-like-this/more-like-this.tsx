import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarFilmsAction } from '../../store/api-actions';
import { FilmType } from '../../types/film-type';
import FilmList from '../film-list/film-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';
import { getIsSimilarFilmsLoading, getSimilarFilms } from '../../store/similar-films/selectors';

export default function MoreLikeThis({currentFilmId}:{currentFilmId:number}): JSX.Element {
  const dispatch = useAppDispatch();
  const similarFilms: FilmType[] = useAppSelector(getSimilarFilms);
  const isLoading: boolean = useAppSelector(getIsSimilarFilmsLoading);

  useEffect(() => {
    dispatch(fetchSimilarFilmsAction(currentFilmId));
  }, [dispatch, currentFilmId]);

  return isLoading ? <LoadingSpinner /> : <FilmList films={similarFilms}/>;
}
