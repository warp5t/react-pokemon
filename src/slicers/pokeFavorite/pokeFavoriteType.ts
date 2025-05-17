export interface PokemonFavor {
  name: string,
  id: number
}

export interface InitialState {
  pokemons: PokemonFavor[];
  isLoading: boolean;
  error: string | null
}