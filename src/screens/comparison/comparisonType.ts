interface PokemonAbility {
  name: string;
  is_hidden: boolean;
}

interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface TablePoke {
  pokemon: {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprite: string;
    stats: PokemonStats;
    types: PokemonType[];
    abilities: PokemonAbility[];
  };
}
