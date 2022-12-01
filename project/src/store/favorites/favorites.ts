import { createSlice } from '@reduxjs/toolkit';
import { FavoritesState } from '../../types/state';
import { NameSpace } from '../../сonst';
import { fetchFavoritesAction } from '../api-actions';

const initialState: FavoritesState = {
  films: [],
  isLoading: true
};

export const favorites = createSlice({
  name: NameSpace.FavoritesFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
