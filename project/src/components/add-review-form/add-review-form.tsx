import React, { FormEvent } from 'react';
import { useAppDispatch } from '../../hooks';
import { postCurrentFilmCommentAction } from '../../store/api-actions';
import { getLightColor } from '../../utils';
import { MAX_COMMENT_LENGTH, MIN_COMMENT_LENGTH } from '../../сonst';

type AddReviewFormProps = {
  filmId: number;
  textfieldBackground: string;
};

export default function AddReviewForm({filmId, textfieldBackground}: AddReviewFormProps): JSX.Element {
  const [formData, setFormData] = React.useState({
    comment: '',
    rating: 0,
    isFormDisabled: false,
  });

  const dispatch = useAppDispatch();

  const handleFormChange = (evt: React.FormEvent<HTMLFormElement>) => {
    const target = evt.target as HTMLTextAreaElement | HTMLInputElement;

    switch(true){
      case target.name === 'review-text':
        setFormData({...formData, comment: target.value});
        break;

      case target.name === 'rating':
        setFormData({...formData, rating: parseInt(target.value, 10)});
        break;

      default:
        setFormData({...formData});
        break;
    }
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    setFormData({...formData, isFormDisabled: true});
    dispatch(postCurrentFilmCommentAction({formData: { comment: formData.comment, rating: formData.rating }, filmId: filmId}));
  };

  return (
    <form action="#" className="add-review__form" onChange={handleFormChange} onSubmit={handleSubmit}>
      <div className="rating">
        <div className="rating__stars">
          { Array.from({length: 10}, (_, i) => i + 1).reverse().map((star: number) => (
            <React.Fragment key={`star-${star}`}>
              <input className="rating__input" id={`star-${star}`} type="radio" name="rating" value={star} disabled={formData.isFormDisabled} />
              <label className="rating__label" htmlFor={`star-${star}`}>Rating {star}</label>
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="add-review__text" style={{background: getLightColor(textfieldBackground)}}>
        <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" defaultValue={formData.comment} disabled={formData.isFormDisabled} />
        <div className="add-review__submit">
          <button
            className="add-review__btn"
            type="submit"
            disabled={formData.isFormDisabled ||
              !(formData.comment.length > MIN_COMMENT_LENGTH && formData.comment.length < MAX_COMMENT_LENGTH && formData.rating !== 0)}
          >Post
          </button>
        </div>

      </div>
    </form>
  );
}
