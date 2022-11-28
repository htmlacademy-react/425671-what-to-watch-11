import { createSlice } from '@reduxjs/toolkit';
import { UserState } from '../../types/state';
import { AuthorizationStatus, NameSpace } from '../../сonst';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authorizedUser: null,
};

export const user = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizedUser = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizedUser = null;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authorizedUser = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizedUser = null;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authorizedUser = null;
      });
  }
});
