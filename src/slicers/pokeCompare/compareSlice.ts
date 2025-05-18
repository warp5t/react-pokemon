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
      abilities: data.abilities.map((ablt: ApiAbility) => ({
        name: ablt.ability.name,
        is_hidden: ablt.is_hidden
      })),
      stats: {
        hp: data.stats.find((sts: ApiStat) => sts.stat.name === 'hp').base_stat,
        attack: data.stats.find((sts: ApiStat) => sts.stat.name === 'attack').base_stat,
        defense: data.stats.find((sts: ApiStat) => sts.stat.name === 'defense').base_stat,
        speed: data.stats.find((sts: ApiStat) => sts.stat.name === 'speed').base_stat
      },
      types: data.types
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
        if (state.data.length < 2) {
          state.data.push(action.payload);
        } else {
          state.error = "Maximum 2 Pokemon for comparison";
        }
      })
      .addCase(getComparePokeThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
})

export default pokeCompareSlice.reducer;