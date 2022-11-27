import { createSlice } from '@reduxjs/toolkit';
import { SimilarFilmsState } from '../../types/state';
import { NameSpace } from '../../сonst';
import { fetchSimilarFilmsAction } from '../api-actions';


const initialState: SimilarFilmsState = {
  films: [],
  isLoading: true
};

export const similarFilms = createSlice({
  name: NameSpace.SimilarFilms,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
