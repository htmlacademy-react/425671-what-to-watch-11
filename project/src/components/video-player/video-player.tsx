import { useEffect, useRef, useState } from 'react';

export type VideoPlayerPropsType = {
  filmSrc: string;
  filmPoster: string;
  muted: boolean;
  autoPlay: boolean;
}

export default function VideoPlayer({filmSrc, filmPoster, muted, autoPlay }: VideoPlayerPropsType): JSX.Element {
  const [isPlaying] = useState(autoPlay);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current === null) {
      return;
    }

    if(isPlaying){
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <video src={filmSrc} poster={filmPoster} ref={videoRef} muted={muted}/>
  );
}
