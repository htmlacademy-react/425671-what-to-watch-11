import { useState } from 'react';
import { FilmType } from '../../types/film-type';
import FilmDescriptionDetails from '../film-description-details/film-description-details';
import FilmDescriptionOverview from '../film-description-overview/film-description-overview';
import FilmDescriptionReviews from '../film-description-reviews/film-description-reviews';

enum DetailsTabs {
  OVERVIEW = 'Overview',
  DETAILS = 'Details',
  REVIEWS = 'Reviews',
}


export default function FilmDescription({film}: { film: FilmType }): JSX.Element {
  const [currentTab, setCurrentTab] = useState<DetailsTabs>(DetailsTabs.OVERVIEW);

  const handleTabClick = (evt: React.MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    setCurrentTab((evt.target as HTMLAnchorElement).dataset.tab as DetailsTabs);
  };

  const getTabContent = () => {
    switch(currentTab){
      case DetailsTabs.OVERVIEW:
        return (<FilmDescriptionOverview film={film} />);
      case DetailsTabs.DETAILS:
        return (<FilmDescriptionDetails film={film} />);
      case DetailsTabs.REVIEWS:
        return (<FilmDescriptionReviews borderColor={film.backgroundColor} />);
    }
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {
            Object.values(DetailsTabs).map((item) => (
              <li key={`tab-${item}`} className={ item === currentTab ? 'film-nav__item film-nav__item--active' : 'film-nav__item' }>
                <a href={`#${item.toLowerCase()}`} onClick={handleTabClick} data-tab={item} className="film-nav__link">{item}</a>
              </li>
            ))
          }
        </ul>
      </nav>

      { getTabContent() }
    </div>
  );
}
