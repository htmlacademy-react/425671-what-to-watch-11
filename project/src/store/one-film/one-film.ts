import { createSlice } from '@reduxjs/toolkit';
import { OneFilmState } from '../../types/state';
import { NameSpace } from '../../сonst';
import { fetchOneFilmAction } from '../api-actions';


const initialState: OneFilmState = {
  film: null,
  isLoading: true
};

export const oneFilm = createSlice({
  name: NameSpace.OneFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOneFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOneFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchOneFilmAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
