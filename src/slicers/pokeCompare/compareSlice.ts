import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState, PokemonCompare, ApiAbility, ApiStat } from './compareSliceType';

export const getComparePokeThunks = createAsyncThunk(
  'pokeComapare/compare',
  async({ url }: { url: string }): Promise<PokemonCompare> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokemon: ${response.status}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      height: data.height,
      weight: data.weight,
      sprite: data.sprites.other['official-artwork']['front_default'],
      abilities: data.abilities.map((a: ApiAbility) => ({
        name: a.ability.name,
        is_hidden: a.is_hidden
      })),
      stats: {
        hp: data.stats.find((s: ApiStat) => s.stat.name === 'hp').base_stat,
        attack: data.stats.find((s: ApiStat) => s.stat.name === 'attack').base_stat,
        defense: data.stats.find((s: ApiStat) => s.stat.name === 'defense').base_stat,
        speed: data.stats.find((s: ApiStat) => s.stat.name === 'speed').base_stat
      }
    }
  }
)

const pokeCompareSlice = createSlice({
  name: 'pokeComare',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getComparePokeThunks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getComparePokeThunks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getComparePokeThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
})

export default pokeCompareSlice.reducer;