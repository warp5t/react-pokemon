export interface PokemonFavor {
  name: string;
  id: number;
}

export interface InitialState {
  pokemons: PokemonFavor[];
  isLoading: boolean;
  error: string | null;
}

export const initialState: InitialState = {
  pokemons: [
    { name: 'bulbasaur', id: 1 },
    { name: 'ivysaur', id: 2 },
  ],
  isLoading: false,
  error: null,
};
