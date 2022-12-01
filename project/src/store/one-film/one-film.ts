import { createSlice } from '@reduxjs/toolkit';
import { OneFilmState } from '../../types/state';
import { NameSpace } from '../../сonst';
import { fetchOneFilmAction, postFavoriteStatusAction } from '../api-actions';


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
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
        if(state.film && state.film.id === action.payload.id){
          state.film.isFavorite = action.payload.isFavorite;
        }
      });
  }
});
