import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilmsState } from '../../types/state';
import { DEFAULT_GENRE, FILMS_PER_PAGE, NameSpace } from '../../сonst';
import { fetchFilmsAction, postFavoriteStatusAction } from '../api-actions';


const initialState: FilmsState = {
  films: [],
  isLoading: true,
  currentGenre: DEFAULT_GENRE,
  filmsOpen: FILMS_PER_PAGE
};

export const films = createSlice({
  name: NameSpace.Films,
  initialState,
  reducers: {
    genreSet: (state, action: PayloadAction<string>) => {
      state.currentGenre = action.payload;
    },
    genreReset: (state) => {
      state.currentGenre = DEFAULT_GENRE;
    },
    filmsOpenAdd: (state) => {
      state.filmsOpen += FILMS_PER_PAGE;
    },
    filmsOpenReset: (state) => {
      state.filmsOpen = FILMS_PER_PAGE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(postFavoriteStatusAction.fulfilled, (state, action) => {
        const filmIndex = state.films.findIndex((film) => film.id === action.payload.id);
        if(filmIndex !== -1){
          state.films[filmIndex].isFavorite = action.payload.isFavorite;
        }
      });
  }
});

export const {genreSet, genreReset, filmsOpenAdd, filmsOpenReset} = films.actions;
