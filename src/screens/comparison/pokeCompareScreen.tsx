import { FC } from 'react';
import { pokeCompare } from '../../data/pokemonData';
import { TablePoke } from '../../interfaces/Pokemon';
import deleteIcon from '../../assets/icon/delete.png';
import style from '../../styles/comparision/Comparision.module.css';

export const CompareScreen = () => {
  return (
    <div className={style.compareSreen}>
      <h2 className={style.compareSreen__title}>Compare Pokemons</h2>
      <div className={style.compareSreen__cardBox}>
        {pokeCompare.map((poke) => (
          <PokeStatTable
            key={poke.name}
            name={poke.name}
            weight={poke.weight}
            height={poke.height}
          />
        ))}
      </div>
    </div>
  );
};

export const PokeStatTable: FC<TablePoke> = ({ name, weight, height }) => {
  return (
    <div className={style.pokeCompare}>
      <h4 className={style.pokeCompare__title}>{name}</h4>
      <div className={style.pokeCompare__stat}>{weight}</div>
      <div className={style.pokeCompare__stat}>{height}</div>
      <div className={style.pokeCompare__wrapBtn}>
        <button className={style.pokeCompare__btn}>
          <img className={style.pokeCompare__img} src={deleteIcon} alt='delete' />
        </button>
      </div>
    </div>
  );
};
