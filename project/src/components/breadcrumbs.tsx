import { BreadcrumbsItem } from '../types/breadcrumbs-item';

type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbsItem[];
}

const getLink = (crumb: BreadcrumbsItem): JSX.Element => crumb.ref ? <a href={crumb.ref} className="breadcrumbs__link">{crumb.title}</a> : <a href="/#" className="breadcrumbs__link">{crumb.title}</a>;

export default function Breadcrumbs({breadcrumbs}: BreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        { breadcrumbs.map((crumb, i) => (
          <li key={`crumb-${1}`} className="breadcrumbs__item">
            {getLink(crumb)}
          </li>
        )) }
      </ul>
    </nav>
  );
}
