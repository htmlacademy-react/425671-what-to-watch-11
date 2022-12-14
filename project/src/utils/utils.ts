import { VideoRef } from '../types/video-ref-type';

export const getLightColor = (rgbHex: string): string => {
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

export const enterFullscreen = (element: HTMLElement | VideoRef | null): void => {
  if (!element) {
    return;
  }

  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

export const exitFullscreen = (): void => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
};

export const checkFullscreen = (): Element | null =>
  document.fullscreenElement ||
  document.mozFullScreenElement ||
  document.webkitFullscreenElement ||
  document.msFullscreenElement;
