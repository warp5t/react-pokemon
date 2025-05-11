import { PokeStat } from '../details/pokeDetailsScreenType';

export type TablePoke = Omit<PokeStat, 'number' | 'image'>;
