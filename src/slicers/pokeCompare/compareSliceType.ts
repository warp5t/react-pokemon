interface PokemonCompare {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprite: string;
  abilities: Array<Abilities>,
  stats: Stats
}

interface PokemonConpareState {
  data: PokemonCompare;
  isLoading: boolean;
  error: string | null;
}

interface Stats {
  hp: number,
  attack: number,
  defense: number,
  speed: number,
}

interface Abilities {
  name: string,
  is_hidden: boolean
}

export const initialState: PokemonConpareState = {
  data: {
    id: 1,
    name: '',
    height: 0,
    weight: 0,
    sprite: '',
    abilities: [
      { name: '', is_hidden: false }
    ],
    stats: {
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0
    }
  },
  isLoading: false,
  error: null,
}