import comments from '../../mock/comments.json'; //temp for comments
import FilmDescriptionComment from '../film-description-comment/film-description-comment';

export default function FilmDescriptionReviews({borderColor}: {borderColor: string}): JSX.Element {
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {comments.filter((comment, index) => index % 2 === 0).map((comment) => (<FilmDescriptionComment key={`comment-${comment.id}`} comment={comment} borderColor={borderColor} />))}
      </div>
      <div className="film-card__reviews-col">
        {comments.filter((comment, index) => index % 2 !== 0).map((comment) => (<FilmDescriptionComment key={`comment-${comment.id}`} comment={comment} borderColor={borderColor} />))}
      </div>
    </div>
  );
}
