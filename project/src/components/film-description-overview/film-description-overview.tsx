import { FilmType } from '../../types/film-type';

const getRating = (value: number): string => {
  switch (true) {
    case value >= 0 && value < 3:
      return 'Bad';
    case value >= 3 && value < 5:
      return 'Normal';
    case value >= 5 && value < 8:
      return 'Good';
    case value >= 8 && value < 10:
      return 'Very good';
    case value === 10:
      return 'Awesome';
    default:
      return 'No Rating';
  }
};

export default function FilmDescriptionOverview({film}: { film: FilmType }): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRating(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>{film.description}</p>
        <p className="film-card__director"><strong>{film.director}</strong></p>
        <p className="film-card__starring"><strong>{film.starring.join(',')}</strong></p>
      </div>
    </>
  );
}
