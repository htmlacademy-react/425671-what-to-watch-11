import { date, image, internet, lorem, music, name, random } from 'faker';
import { FilmType } from '../types/film-type';
import { CommentType } from '../types/comment-type';
import { UserData } from '../types/user-data';

const makeRandomNumber = (max: number): number => Math.floor(Math.random() * max);
const makeRandomColor = () => Math.floor(Math.random() * 16777215).toString(16);
const makeRandomName = () => `${ name.firstName() } ${ name.lastName() }`;
const makeRandomDate = (start: Date, end: Date): number => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).getFullYear();

export const makeMockFilm = (): FilmType => ({
  id: makeRandomNumber(1000),
  name: random.words(3),
  posterImage: image.imageUrl(),
  previewImage: image.imageUrl(),
  backgroundImage: image.imageUrl(),
  backgroundColor: makeRandomColor(),
  videoLink: image.imageUrl(),
  previewVideoLink: image.imageUrl(),
  description: lorem.paragraph(),
  rating: makeRandomNumber(10),
  scoresCount: makeRandomNumber(1000),
  director: makeRandomName(),
  starring: Array.from({ length: 3 }, makeRandomName),
  runTime: makeRandomNumber(240),
  genre: music.genre(),
  released: makeRandomDate(new Date(1970, 0, 1), new Date()),
  isFavorite: Math.random() < 0.5,
} as FilmType);

export const makeMockComment = (): CommentType => ({
  comment: lorem.sentence(),
  date: String(date.recent()),
  id: makeRandomNumber(1000),
  rating: makeRandomNumber(10),
  user: {
    id: makeRandomNumber(1000),
    name: makeRandomName(),
  }
} as CommentType);

export const makeMockUser = (): UserData => ({
  id: makeRandomNumber(1000),
  avatarUrl: image.imageUrl(),
  email: internet.email(),
  token: random.alpha({ count: 10 }),
} as UserData);
