import { FC } from 'react';
import { PokeStat } from '../../interfaces/Pokemon';
import style from '../styles/pokeDetails/PokeDetails.module.css';

export const PokeDetails: FC<PokeStat> = ({ name, height, weight, image, number }) => {
  return (
    <div className={style.pokeStat}>
      <h4 className={style.pokeStat__title}>{name}</h4>
      <div className={style.pokeStat__subwrap}>
        <div className={style.pokeStat__detail}>{height}</div>
        <div className={style.pokeStat__detail}>{weight}</div>
      </div>
      <div className={style.pokeStat__wrapImg}>
        <img src={image} alt='pokemon' className={style.pokeStat__img} />
      </div>
      <div className={style.pokeStat__detail}>{number}</div>
    </div>
  );
};
