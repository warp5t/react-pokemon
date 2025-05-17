import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonFavor } from './pokeFavoriteType';
import { initialState } from './pokeFavoriteType';

const pokeFavoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<PokemonFavor>) {
      const existingPokemon = state.pokemons.find(
        (pokemon) => pokemon.id === action.payload.id || pokemon.name === action.payload.name,
      );
      if (!existingPokemon) {
        state.pokemons.push(action.payload);
      }
    },
    removeFavorite(state, action: PayloadAction<PokemonFavor>) {
      state.pokemons = state.pokemons.filter(
        (pokemon) => pokemon.id !== action.payload.id && pokemon.name !== action.payload.name,
      );
    },
  },
});

export const { addFavorite, removeFavorite } = pokeFavoriteSlice.actions;
export default pokeFavoriteSlice.reducer;
