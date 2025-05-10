import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initialState } from './detailsSliceType';

// export const getDetailsPokeThunks = createAsyncThunk(
//   'pokeDetails/fetchDetails',
//   async ({ url }: { url: string; }) => {
//     const response = await fetch(url);
//     return await response.json();
//   }
// );

export const getDetailsPokeThunks = createAsyncThunk(
  'pokeDetails/fetchDetails',
  async ({ url }: { url: string; }) => {

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
      types: data.types.map((t: { type: { name: string } }) => t.type.name),
      sprite: data.sprites.other['official-artwork']['front_default']
    };
});


const pokeDetailsSlice = createSlice({
  name: 'pokeDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDetailsPokeThunks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDetailsPokeThunks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = {
          id: action.payload.id,
          name: action.payload.name,
          height: action.payload.height,
          weight: action.payload.weight,
          types: action.payload.types,
          sprite: action.payload.sprite
        };
      })
      .addCase(getDetailsPokeThunks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default pokeDetailsSlice.reducer;