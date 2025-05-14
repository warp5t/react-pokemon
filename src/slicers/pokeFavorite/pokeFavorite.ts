import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const pokeFavoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<PokemonFavor>) {
      const existingPokemon = state.pokemons.find(
        pokemon => pokemon.id === action.payload.id || pokemon.name === action.payload.name
      );
      if (!existingPokemon) {
        state.pokemons.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<PokemonFavor>) {
      state.pokemons = state.pokemons.filter(
        pokemon => pokemon.id !== action.payload.id && pokemon.name !== action.payload.name
      );
    }
  },
});

export const { addFavorite, removeFavorite } = pokeFavoriteSlice.actions;
export default pokeFavoriteSlice.reducer;
