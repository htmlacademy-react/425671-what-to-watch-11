import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

type FilmCardType = {
  id: number;
  name: string;
  isActive: boolean;
  previewSrc: string;
  previewImage: string;
};

export default function FilmCard({id, name, previewImage, previewSrc, isActive }: FilmCardType): JSX.Element {
  return (
    <article className="small-film-card catalog__films-card" id={id.toString()}>
      <div className="small-film-card__image">
        {
          isActive ?
            <VideoPlayer filmSrc={previewSrc} filmPoster={previewImage} muted autoPlay/> :
            <img src={previewImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}
