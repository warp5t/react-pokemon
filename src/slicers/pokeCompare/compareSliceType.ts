export interface PokemonCompare {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<String>;
  sprite: string;
  abilities: Array<Abilities>,
  stats: Stats
}

interface PokemonCompareState {
  data: PokemonCompare[];
  isLoading: boolean;
  error: string | null;
}

export interface Stats {
  hp: number,
  attack: number,
  defense: number,
  speed: number,
}

export interface Abilities {
  name: string,
  is_hidden: boolean
}

export interface ApiAbility {
  ability: {
    name: string;
  };
  is_hidden: boolean;
}

export interface ApiStat {
  stat: {
    name: string;
  };
  base_stat: number;
}

export const initialState: PokemonCompareState = {
  data: [],
  isLoading: false,
  error: null,
}