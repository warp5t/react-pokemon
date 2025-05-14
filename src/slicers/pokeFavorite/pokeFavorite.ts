import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  pokemons: Array<string>;
  isLoading: boolean;
  error: string | null
}

const initialState: InitialState = {
  pokemons: ['bulbasaur', 'ivysaur'],
  isLoading: false,
  error: null,
};

const pokeFavoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      const existingPokemon = state.pokemons.find(
        pokemon => pokemon === action.payload
      );
      if (!existingPokemon) {
        state.pokemons.push(action.payload)
      }
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.pokemons = state.pokemons.filter(
        pokemon => pokemon !== action.payload
      );
    }
  },

});

export const { addFavorite, removeFavorite } = pokeFavoriteSlice.actions;
export default pokeFavoriteSlice.reducer;
