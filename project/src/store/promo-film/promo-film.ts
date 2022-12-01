import { createSlice } from '@reduxjs/toolkit';
import { PromoFilmState } from '../../types/state';
import { NameSpace } from '../../сonst';
import { fetchPromoFilmAction, postFavoriteStatusAction } from '../api-actions';


const initialState: PromoFilmState = {
  film: null,
  isLoading: true
};

export const promoFilm = createSlice({
  name: NameSpace.PromoFilm,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPromoFilmAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
        if(state.film && state.film.id === action.payload.id){
          state.film.isFavorite = action.payload.isFavorite;
        }
      });
  }
});
