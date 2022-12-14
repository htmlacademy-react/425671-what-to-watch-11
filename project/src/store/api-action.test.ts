import { Action } from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';

import { createAPI } from '../services/api';
import { checkAuthAction, loginAction } from './api-actions';
import { State } from '../types/state';
import { APIRoute, AUTH_TOKEN_KEY_NAME } from '../сonst';
import { AuthData } from '../types/auth-data';
import { redirectToRoute } from './action';
// import { makeMockFilm, makeMockComment } from '../utils/test-mocks';
// import { FilmType } from '../types/film-type';

// const film = makeMockFilm();
// const films: FilmType[] = Array.from({ length: 4 }, makeMockFilm);
// const comment = makeMockComment();

describe('Test for API (Async Actions)', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('Returns Authorization status = AUTH if response code is 200', async () => {
    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('Returns Authorization status = NOAUTH if response code is 401', async () => {
    const fakeStore = mockStore();
    mockAPI.onGet(APIRoute.Login)
      .reply(401, { error: 'You are not logged in or you do not have permission to this page.' });

    expect(fakeStore.getActions()).toEqual([]);

    await fakeStore.dispatch(checkAuthAction());

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.rejected.type
    ]);
  });

  it('Login correct user with POST /login', async () => {
    const mockUser: AuthData = { email: 'dummy@dummy.io', password: 'hack-me-please' };
    const mockToken = 'super-secret-token';

    mockAPI.onPost(APIRoute.Login).reply(200, { token: mockToken });

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(mockUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, mockToken);
  });

  it('Rejects Login if error in email', async () => {
    const mockUser: AuthData = { email: 'dummy@dummy', password: 'hack-me-please' };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(400, {});

    const fakeStore = mockStore();

    await fakeStore.dispatch(loginAction(mockUser));

    const actions = fakeStore.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.rejected.type
    ]);
  });


});
