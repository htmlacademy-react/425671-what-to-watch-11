import { Link } from 'react-router-dom';
import { BreadcrumbsItem } from '../types/breadcrumbs-item';

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbsItem[];
}

const getLink = (crumb: BreadcrumbsItem): JSX.Element => crumb.ref ? <Link to={crumb.ref} className="breadcrumbs__link">{crumb.title}</Link> : <a href="/#" className="breadcrumbs__link">{crumb.title}</a>;

export default function Breadcrumbs({breadcrumbs}: BreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        { breadcrumbs.map((crumb) => (
          <li key={`crumb-${crumb.id}`} className="breadcrumbs__item">
            {getLink(crumb)}
          </li>
        )) }
      </ul>
    </nav>
  );
}
