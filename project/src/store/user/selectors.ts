import { State } from '../../types/state';
import { UserData } from '../../types/user-data';
import { AuthorizationStatus, NameSpace } from '../../сonst';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getIsAuthorized = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getAuthorizedUser = (state: State): UserData | null => state[NameSpace.User].authorizedUser;
