import { useEffect, useRef, useState } from 'react';

export type VideoPlayerPropsType = {
  filmSrc: string;
  filmPoster: string;
  muted: boolean;
  autoPlay: boolean;
}

export default function VideoPlayer({filmSrc, filmPoster, muted, autoPlay }: VideoPlayerPropsType): JSX.Element {
  const [, setIsLoading] = useState(true);
  const [isPlaying] = useState(autoPlay);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    let isVideoPlayerMounted = true;

    if (videoRef.current === null) {
      return;
    }

    videoRef.current.addEventListener('loadeddata', () => {
      if (isVideoPlayerMounted) {
        setIsLoading(false);
      }
    });

    if (isPlaying) {
      setTimeout(() => {
        if (videoRef.current !== null) {
          videoRef.current.play();
        }
      }, 1000);
      return;
    }

    videoRef.current.pause();

    return () => {
      isVideoPlayerMounted = false;
    };
  }, [isPlaying]);

  return (
    <video src={filmSrc} poster={filmPoster} ref={videoRef} muted={muted}/>
  );
}
