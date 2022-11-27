import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCommentsAction } from '../../store/api-actions';
import { getComments, getIsCommentsLoading } from '../../store/film-comments/selectors';
import FilmDescriptionComment from '../film-description-comment/film-description-comment';
import LoadingSpinner from '../loading-spinner/loading-spinner';

export default function FilmDescriptionReviews({borderColor}: {borderColor: string}): JSX.Element {
  const urlParams = useParams();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);
  const isLoading = useAppSelector(getIsCommentsLoading);

  useEffect(() => {
    if (urlParams.id) {
      dispatch(fetchCommentsAction(urlParams.id));
    }
  }, [dispatch, urlParams.id]);

  if(isLoading) {
    return (
      <div className="film-card__reviews film-card__row">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.filter((_, index) => index % 2 === 0).map((comment) => (<FilmDescriptionComment key={`comment-${comment.id}`} comment={comment} borderColor={borderColor} />))}
      </div>
      <div className="film-card__reviews-col">
        {comments.filter((_, index) => index % 2 !== 0).map((comment) => (<FilmDescriptionComment key={`comment-${comment.id}`} comment={comment} borderColor={borderColor} />))}
      </div>
    </div>
  );
}
