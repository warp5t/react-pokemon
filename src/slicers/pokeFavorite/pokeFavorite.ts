import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PokemonFavor {
  name: string,
  id: number
}

interface InitialState {
  pokemons: PokemonFavor[];
  isLoading: boolean;
  error: string | null
}

const initialState: InitialState = {
  pokemons: [
    { name: 'bulbasaur', id: 1 },
    { name: 'ivysaur', id: 2 }
  ],
  isLoading: false,
  error: null,
};

export const addFavoriteThunks = createAsyncThunk(
  'favoriteList/addFavorite',
  async ({ url }: { url: string }) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${response.status}`);
    }

    const data = await response.json();

    return {
      name: data.name,
      id: data.id
    };
  },
);

export const removeFavoriteThunks = createAsyncThunk(
  'favoriteList/removeFavorite',

    async ({ url }: { url: string }) => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id
    };
  },
);


const pokeFavoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(addFavoriteThunks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(addFavoriteThunks.fulfilled, (state, action) => {
      state.isLoading = false;
      const existingPokemon = state.pokemons.find(
        pokemon => pokemon.id === action.payload.id
      );
      if (!existingPokemon) {
        state.pokemons.push(action.payload);
      }
    })
    .addCase(addFavoriteThunks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to add favorite';
    })
    .addCase(removeFavoriteThunks.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(removeFavoriteThunks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pokemons = state.pokemons.filter(
        pokemon => pokemon.id !== action.payload.id
      );
    })
    .addCase(removeFavoriteThunks.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to add favorite';
    });
  }
});

export default pokeFavoriteSlice.reducer;