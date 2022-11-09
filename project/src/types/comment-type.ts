import { UserType } from './user-type';

export type CommentType = {
  id: number;
  user: UserType;
  rating: number;
  comment: string;
  date: string;
}
