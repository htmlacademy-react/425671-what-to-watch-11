import { CommentType } from '../../types/comment-type';
import { State } from '../../types/state';
import { NameSpace } from '../../сonst';

export const getComments = (state: State): CommentType[] => state[NameSpace.Comments].comments;
export const getIsCommentsLoading = (state: State): boolean => state[NameSpace.Comments].isLoading;
