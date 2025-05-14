import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PokemonFavor {
  name: string,
  id: number
}

interface InitialState {
  pokemons: PokemonFavor[];
}

const initialState: InitialState = {
  pokemons: [
    { name: 'bulbasaur', id: 1 },
    { name: 'ivysaur', id: 2 }
  ]
};
const pokeFavoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<PokemonFavor>) {
      const existingPokemon = state.pokemons.find(
        pokemon => pokemon.id === action.payload.id
      );
      if (!existingPokemon) {
        state.pokemons.push(action.payload)
      }
    },
    removeFavorite(state, action: PayloadAction<number>) {
      state.pokemons = state.pokemons.filter(
        pokemon => pokemon.id !== action.payload
      );
    }
  }
});

export default pokeFavoriteSlice.reducer;