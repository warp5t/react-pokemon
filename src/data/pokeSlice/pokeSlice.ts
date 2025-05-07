import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface PokeResults {
  data: DataPoke;
  isLoading: boolean;
  error: string | null;
}

interface InfoPoke {
  name: string;
  url: string;
}

interface DataPoke {
  count: number;
  next: string | null;
  previous: null | string;
  results: InfoPoke[];
}

const initialState: PokeResults = {
  data: {
    count: 0,
    next: null,
    previous: null,
    results: [],
  },
  isLoading: false,
  error: null,
};

export const getInitialPokeThunks = createAsyncThunk('pokeList/fetchInitial', async () => {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon-species');
  return await response.json();
});

const pokeListSlice = createSlice({
  name: 'pokeList',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
    fetchDataPoke(state, action) {
      state.data = {
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        results: action.payload.results,
      };
    },
  },
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
        };
      })
      .addCase(getInitialPokeThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { setLoading, fetchDataPoke } = pokeListSlice.actions;
export default pokeListSlice.reducer;
