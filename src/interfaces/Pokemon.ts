export interface PokeCardProps {
  name: string;
  number: number;
}
export interface PokeStat {
  number: number;
  name: string;
  height: number;
  weight: number;
  image: string;
}

export type TablePoke = Omit<PokeStat, 'number' | 'image'>;
