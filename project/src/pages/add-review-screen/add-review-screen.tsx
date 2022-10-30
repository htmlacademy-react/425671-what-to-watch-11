import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Header from '../../components/header/header';
import UserBlock from '../../components/user-block/user-block';
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
  const film: FilmType | undefined = films.find((item) => item.id === Number(urlParams.id));

  const breadcrumbs: BreadcrumbsItem[] = [];
  film && breadcrumbs.push({id: 1, title: film.name, ref: `/films/${film.id}/`});
  film && breadcrumbs.push({id: 2, title: 'Add review'});

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
        <AddReviewForm textfieldBackground={getLightColor(film.backgroundColor)}/>
      </div>

    </section>
  ) : <NotFoundScreen/>;
}
