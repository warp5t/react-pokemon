interface PokemonDetails {
  id: number | null;
  name: string | null;
  height: number | null;
  weight: number | null;
  types: string[];
  sprite: string | null;
}

interface PokemonDetailsState {
  data: PokemonDetails;
  isLoading: boolean;
  error: string | null;
}

export const initialState: PokemonDetailsState = {
  data: {
    id: null,
    name: null,
    height: null,
    weight: null,
    types: [],
    sprite: null
  },
  isLoading: false,
  error: null
};