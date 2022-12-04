import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useVideoPlayer from '../../hooks/useVideoPlayer';
import { fetchOneFilmAction } from '../../store/api-actions';
import { getIsFilmLoading, getOneFilm } from '../../store/one-film/selectors';
import NotFoundScreen from '../not-found-screen/not-found-screen';

export default function PlayerScreen(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const videoElement = useRef<HTMLVideoElement | null>(null);

  const {
    playerState,
    handlePlayClick,
    handleOnTimeUpdate,
    handleFullScreenClick,
    setDuration,
  } = useVideoPlayer(videoElement);

  const film = useAppSelector(getOneFilm);
  const isLoading = useAppSelector(getIsFilmLoading);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOneFilmAction(params.id));
    }
  }, [dispatch, params.id]);

  if (!film && !isLoading) {
    return <NotFoundScreen />;
  }

  const handleExitButtonClick = () => {
    if (film) {
      navigate(`/films/${film.id}`);
    }
  };

  return (
    <div className="player">
      <Helmet>
        <title>WTW: Palyer</title>
      </Helmet>
      <video
        ref={videoElement}
        src={film?.previewVideoLink}
        className="player__video"
        poster={film?.previewImage}
        onTimeUpdate={handleOnTimeUpdate}
        onLoadedData={() => {
          if (videoElement.current?.duration) {
            setDuration(videoElement.current?.duration);
          }
        }}
      />

      <button onClick={handleExitButtonClick} type="button" className="player__exit">Exit</button>

      <div className="player__controls">
        <div className="player__controls-row">
          <div className="player__time">
            <progress className="player__progress" value={playerState.progress} max="100"></progress>
            <div className="player__toggler" style={{left: `${playerState.progress}%`}}>Toggler</div>
          </div>
          <div className="player__time-value">{playerState.duration}</div>
        </div>

        <div className="player__controls-row">
          <button type="button" className="player__play" onClick={handlePlayClick}>
            <svg viewBox="0 0 19 19" width="19" height="19">
              <use xlinkHref={playerState.isPlaying ? '#pause' : '#play-s'}></use>
            </svg>
            <span>{playerState.isPlaying ? 'Pause' : 'Play'}</span>
          </button>
          <div className="player__name">{film?.name}</div>

          <button type="button" className="player__full-screen" onClick={handleFullScreenClick}>
            <svg viewBox="0 0 27 27" width="27" height="27">
              <use xlinkHref="#full-screen"></use>
            </svg>
            <span>Full screen</span>
          </button>
        </div>
      </div>
    </div>
  );
}
