import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/breadcrumbs';
import Header from '../../components/header';
import UserBlock from '../../components/user-block';
import { BreadcrumbsItem } from '../../types/breadcrumbs-item';
import { FilmType } from '../../types/film-type';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AddReviewProps = {
  films: FilmType[];
}

const getLightColor = (rgbHex: string): string => {
  let r = 0, g = 0, b = 0;
  if (rgbHex.length === 4) {
    r = Number(`0x${rgbHex[1]}${rgbHex[1]}`);
    g = Number(`0x${rgbHex[2]}${rgbHex[2]}`);
    b = Number(`0x${rgbHex[3]}${rgbHex[3]}`);
  } else if (rgbHex.length === 7) {
    r = Number(`0x${rgbHex[1]}${rgbHex[2]}`);
    g = Number(`0x${rgbHex[3]}${rgbHex[4]}`);
    b = Number(`0x${rgbHex[5]}${rgbHex[6]}`);
  }

  r /= 255;
  g /= 255;
  b /= 255;
  const cmin = Math.min(r,g,b),
    cmax = Math.max(r,g,b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = 0;

  if (delta === 0) {
    h = 0;
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6;
  } else if (cmax === g) {
    h = (b - r) / delta + 2;
  } else {
    h = (r - g) / delta + 4;
  }

  h = Math.round(h * 60);

  if (h < 0) {
    h += 360;
  }

  l = (cmax + cmin) / 2;
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h},${s + 6}%,${l + 3}%)`;
};


export default function AddReviewScreen({films}: AddReviewProps): JSX.Element {
  const urlParams = useParams();
  const film:FilmType = films.find((item) => item.id === Number(urlParams.id)) as FilmType;

  const breadcrumbs: BreadcrumbsItem[] = [];
  breadcrumbs.push({id: 1, title: film.name, ref: `/films/${film.id}/`});
  breadcrumbs.push({id: 2, title: 'Add review'});

  return film ? (
    <section className="film-card film-card--full" style={{background: film.backgroundColor}}>
      <Helmet>
        <title>WTW: {film.name} — Add review</title>
      </Helmet>
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.posterImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
          <UserBlock />
        </Header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} />
        </div>
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-10" type="radio" name="rating" value="10" />
              <label className="rating__label" htmlFor="star-10">Rating 10</label>

              <input className="rating__input" id="star-9" type="radio" name="rating" value="9" />
              <label className="rating__label" htmlFor="star-9">Rating 9</label>

              <input className="rating__input" id="star-8" type="radio" name="rating" value="8" defaultChecked />
              <label className="rating__label" htmlFor="star-8">Rating 8</label>

              <input className="rating__input" id="star-7" type="radio" name="rating" value="7" />
              <label className="rating__label" htmlFor="star-7">Rating 7</label>

              <input className="rating__input" id="star-6" type="radio" name="rating" value="6" />
              <label className="rating__label" htmlFor="star-6">Rating 6</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
              <label className="rating__label" htmlFor="star-5">Rating 5</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-1" type="radio" name="rating" value="1" />
              <label className="rating__label" htmlFor="star-1">Rating 1</label>
            </div>
          </div>

          <div className="add-review__text" style={{background: getLightColor(film.backgroundColor)}}>
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  ) : <NotFoundScreen/>;
}
