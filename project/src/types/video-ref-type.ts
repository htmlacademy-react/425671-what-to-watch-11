export type VideoRef = {
  requestFullscreen: () => void;
  pause: () => void;
  play: () => void;
  currentTime: number;
  duration: number;
  webkitRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  msRequestFullscreen?: () => void;
}
