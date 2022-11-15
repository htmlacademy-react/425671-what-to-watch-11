import { FilmType } from './types/film-type';
import { DEFAULT_GENRE } from './сonst';

const getLightColor = (rgbHex: string): string => {
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

const makeGenres = (films: FilmType[]) => {
  const genres = new Set<string>();
  genres.add(DEFAULT_GENRE);
  films.forEach((film: FilmType) => genres.add(film.genre));
  return [...genres].slice(0, 9);
};

export {
  getLightColor,
  makeGenres
};
