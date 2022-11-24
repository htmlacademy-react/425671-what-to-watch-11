import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSimilarFilmsAction } from '../../store/api-actions';
import { FilmType } from '../../types/film-type';
import FilmList from '../film-list/film-list';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner';

export default function MoreLikeThis({currentFilmId}:{currentFilmId:number}): JSX.Element {
  const dispatch = useAppDispatch();
  const similarFilms: FilmType[] = useAppSelector((state) => state.similarFilms);
  const isLoading: boolean = useAppSelector((state) => state.isSimilarFilmsLoading);

  useEffect(() => {
    dispatch(fetchSimilarFilmsAction(currentFilmId));
  }, [dispatch, currentFilmId]);

  return isLoading ? <LoadingSpinner /> : <FilmList films={similarFilms}/>;
}
