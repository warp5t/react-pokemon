import { FC } from 'react';
import { TablePoke } from './comparisonType';
import deleteIcon from '../../assets/icon/delete.png';
import style from '../../screens/comparison/Comparision.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';


import { capitalizing } from '../../utils/capitalizer';

export const CompareScreen = () => {

  return (
    <div className={style.compareSreen}>
      <h2 className={style.compareSreen__title}>Compare Pokemons</h2>
      <div className={style.compareSreen__cardBox}>
        {/* {pokeCompare.map((poke) => (
          <PokeStatTable
            key={poke.name}
            name={poke.name}
            weight={poke.weight}
            height={poke.height}
          />
        ))} */}


      </div>
    </div>
  );
};

export const PokeStatTable: FC<TablePoke> = ({ name, weight, height }) => {
  return (
    <div className={style.pokeCompare}>
      <h4 className={style.pokeCompare__title}>{capitalizing(name)}</h4>
      <div className={style.pokeCompare__stat}>Weigth: {weight}</div>
      <div className={style.pokeCompare__stat}>Height: {height}</div>
      <div className={style.pokeCompare__wrapBtn}>
        <button className={style.pokeCompare__btn}>
          <img className={style.pokeCompare__img} src={deleteIcon} alt='delete' />
        </button>
      </div>
    </div>
  );
};
