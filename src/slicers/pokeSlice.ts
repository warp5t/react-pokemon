import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState  } from './pokeSlicerType';

export const getInitialPokeThunks = createAsyncThunk(
  'pokeList/fetchInitial',
  async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-species');
  return await response.json();
});

export const getPagePokeThunks = createAsyncThunk(
  'pokeList/fetchPage',
  async ({ url }: { url: string; actionType: 'next' | 'previous' }) => {
    const response = await fetch(url);
    return await response.json();
  }
);

const pokeListSlice = createSlice({
  name: 'pokeList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getInitialPokeThunks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getInitialPokeThunks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          count: action.payload.count,
          next: action.payload.next,
          previous: action.payload.previous,
          results: action.payload.results,
          currentPage: 1,
        };
      })
      .addCase(getInitialPokeThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      })
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
          currentPage: action.meta.arg.actionType === 'next'
          ? state.data.currentPage + 1
          : state.data.currentPage - 1,
        };
      })
      .addCase(getPagePokeThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default pokeListSlice.reducer;
