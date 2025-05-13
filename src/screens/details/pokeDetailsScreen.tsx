import { FC } from 'react';
import { PokeStat } from './pokeDetailsScreenType';
import style from '../../screens/details/PokeDetails.module.css';
import { useParams } from 'react-router-dom';
import { pokeStat } from '../../data/pokemonData';
import { capitalizing } from '../../utils/capitalizer';

export const PokeDetails: FC<PokeStat> = ({ name, height, weight, image, number }) => {
  return (
    <div className={style.pokeStat}>
      <h4 className={style.pokeStat__title}>{capitalizing(name)}</h4>
      <div className={style.pokeStat__subwrap}>
        <div className={style.pokeStat__detail}>Height: {height}</div>
        <div className={style.pokeStat__detail}>Weight: {weight}</div>
      </div>
      <div className={style.pokeStat__wrapImg}>
        <img src={image} alt='pokemon' className={style.pokeStat__img} />
      </div>
      <div className={style.pokeStat__detail}>{number}</div>
    </div>
  );
};

export const PokeDetailsScreen = () => {
  const { pokemonName } = useParams<{ pokemonName: string }>();
  const poke = pokeStat.find((p) => p.name === pokemonName);

  if (!poke) {
    return <div>Покемон не найден!</div>;
  }

  return (
    <div className={style.details}>
      <PokeDetails
        name={poke.name}
        height={poke.height}
        weight={poke.weight}
        image={poke.image}
        number={poke.number}
      />
    </div>
  );
};
