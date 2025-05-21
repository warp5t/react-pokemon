import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from './pokeSlicerType';

export const getSamePageThunks = createAsyncThunk(
  'pokeList/fetchSamePage',
  async ({ url }: { url: string }) => {
    const response = await fetch(url);
    return await response.json();
  },
);

export const getPagePokeThunks = createAsyncThunk(
  'pokeList/fetchPage',
  async ({ url }: { url: string; actionType: 'next' | 'previous' }) => {
    const response = await fetch(url);
    return await response.json();
  },
);

const pokeListSlice = createSlice({
  name: 'pokeList',
  initialState,
  reducers: {
     setInitialData(state, action) {
      state.data = {
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        results: action.payload.results,
        currentPage: 1,
      };
      state.isInitialLoaded = true;
    },
  },
  extraReducers: (builder) => {
    builder
      // --------------------- pokeThunks ----------------------
      .addCase(getPagePokeThunks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPagePokeThunks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          results: action.payload.results,
          currentPage:
            action.meta.arg.actionType === 'next'
              ? state.data.currentPage + 1
              : state.data.currentPage - 1,
        };
      })
      .addCase(getPagePokeThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      })
      //------------------------------ samePage ---------------------
      .addCase(getSamePageThunks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSamePageThunks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          results: action.payload.results,
          currentPage: state.data.currentPage,
        };
      })
      .addCase(getSamePageThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default pokeListSlice.reducer;
export const { setInitialData } = pokeListSlice.actions;
