import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';

type FilmCardType = {
  id: number;
  name: string;
  previewVideoLink: string;
  previewImage: string;
};

export default function FilmCard({id, name, previewImage, previewVideoLink }: FilmCardType): JSX.Element {
  const [isTimer, setTimer] = useState<boolean>(false);
  const [isActive, setActive] = useState<boolean>(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if(!isTimer){
      return;
    }

    timer.current = setTimeout(() => {
      setActive(true);
    }, 1000);

    return () => {
      if(timer.current) {
        clearTimeout(timer.current);
      }
      setActive(false);
    };
  }, [isTimer]);

  return (
    <article className="small-film-card catalog__films-card" onMouseOver={() => setTimer(true)} onMouseOut={() => setTimer(false)}>
      <div className="small-film-card__image">
        {
          isActive ?
            <VideoPlayer filmSrc={previewVideoLink} filmPoster={previewImage} muted autoPlay/> :
            <img src={previewImage} alt={name} width="280" height="175" />
        }
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">{name}</Link>
      </h3>
    </article>
  );
}
