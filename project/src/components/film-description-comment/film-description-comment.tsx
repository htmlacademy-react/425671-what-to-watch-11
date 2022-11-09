import { CommentType } from '../../types/comment-type';
import { getLightColor } from '../../utils';

type FilmDescriptionCommentProps = {
  comment: CommentType;
  borderColor: string;
}


export default function FilmDescriptionComment({comment, borderColor}: FilmDescriptionCommentProps): JSX.Element {
  return (
    <div className="review" style={{borderColor: getLightColor(borderColor)}}>
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime="2016-12-24">December 24, 2016</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}
