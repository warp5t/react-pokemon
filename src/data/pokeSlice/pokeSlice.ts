import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface PokeResults {
  data: DataPoke;
  isLoading: boolean;
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
    results: []
  },
  isLoading: false,
};

export const getInitialPokeThunks = createAsyncThunk(
  'pokeList/fetchInitial',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await fetch('https://pokeapi.co/api/v2/pokemon-species');
      const { count, next, previous, results } = await response.json();

      dispatch(fetchDataPoke({
        count,
        next,
        previous,
        results
      }));
    } finally {
      dispatch(setLoading(false));
    }
  }
);

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
        results: action.payload.results
      };
    }
  },
});


export const { setLoading, fetchDataPoke } = pokeListSlice.actions;
export default pokeListSlice.reducer