import { FC } from 'react';
import { pokeStat } from '../data/pokemonData';
import { PokeDetails } from './pokeDetailsScreen';

export const PokeScreenList: FC = () => {
  return (
    <div>
      {pokeStat.map((comp) => (
        <PokeDetails
          key={`${comp.name}`}
          name={comp.name}
          height={comp.height}
          weight={comp.weight}
          image={comp.image}
          number={comp.number}
        />
      ))}
    </div>
  );
};
