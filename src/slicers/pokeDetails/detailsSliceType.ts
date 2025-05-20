interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
}

interface PokemonDetailsState {
  data: PokemonDetails;
  isLoading: boolean;
  error: string | null;
}

export const initialState: PokemonDetailsState = {
  data: {
    id: 1,
    name: '',
    height: 0,
    weight: 0,
    sprite: '',
  },
  isLoading: false,
  error: null,
};
