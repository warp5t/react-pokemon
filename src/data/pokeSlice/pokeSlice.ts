import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface PokeResults {
  data: DataPoke,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  isLoading: boolean,
}

export interface InfoPoke {
  name: string,
  url: string
}

interface DataPoke {
  count: number,
  next: string,
  previous: null | string;
  results: Array<InfoPoke>
}

const initialState: PokeResults = {
  data: {
    count: 1025,
    next: 'https://pokeapi.co/api/v2/pokemon-species/?offset=20&limit=20',
    previous: null,
    results: [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon-species/1/'
      }
    ]
  },
  status: 'idle',
  error: null,
  isLoading: false,
};

export const fetchInitialPokemons = createAsyncThunk(
  'pokeList/fetchInitial',
  async(_,{dispatch}) => {
    try {
      dispatch(setLoading(true))
      const response = await fetch('https://pokeapi.co/api/v2/pokemon-species');
      return await response.json();
    } catch (e) {
      // Error
    } finally {
      dispatch(setLoading(false))
    }
  }
);


const pokeListSlice = createSlice({
  name: 'pokeList',
  initialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = action.payload
    },
    fetchDataPoke(state, action) {
      state.data.results = action.payload
    }
  },
})


export const { setLoading, fetchDataPoke } = pokeListSlice.actions;
export default pokeListSlice.reducer