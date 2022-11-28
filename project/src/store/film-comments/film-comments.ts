import { createSlice } from '@reduxjs/toolkit';
import { FilmCommentsState } from '../../types/state';
import { NameSpace } from '../../сonst';
import { fetchCommentsAction } from '../api-actions';


const initialState: FilmCommentsState = {
  comments: [],
  isLoading: true
};

export const filmComments = createSlice({
  name: NameSpace.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.isLoading = false;
      });
  }
});
