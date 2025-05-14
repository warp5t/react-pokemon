import style from '../Pokemons/Pokemons.module.css';
import favorites from '../../assets/icon/star.png';
import comparison from '../../assets/icon/arrows.png';
import { Link } from 'react-router-dom';
import { capitalizing } from '../../utils/capitalizer';
import { PokeCardProps } from './pokemonsTyoe';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../slicers/pokeFavorite/pokeFavorite';

import { RootState } from '../../store/store';
const logging = (name: string) => {
  console.log(name);
};

export const PokeCard = ({ name, number }: PokeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const dispatch = useDispatch();

  const pokeList = useSelector((state: RootState) => state.pokeList.data);
  const pokeFavorites = useSelector((state: RootState) => state.pokeFavorites.pokemons)
  const pokeDetails = useSelector((state: RootState) => state.pokeDetails.data)

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFavorite(prev => !prev);

    if (isFavorite) {
      dispatch(removeFavorite())
    } else {
      dispatch(addFavorite())
    }
  };

  return (
    <Link
      to={`/details/${name}`}
      className={style.pokemons__item}
      onClick={() => {
        logging(name);
      }}
    >
      <div className={style.pokemons__wrapTitle}>
        <h3>{capitalizing(name)}</h3>
        <div>#{number}</div>
      </div>
      <div className={style.pokemons__wrapButton}>
      <button
          onClick={toggleFavorite}
          className={isFavorite ? style.pokemons__btn_active : ''}
        >
          <img src={favorites} alt='favorites' />
        </button>
        <button onClick={(e) => e.preventDefault()}>
          <img src={comparison} alt='comparison' />
        </button>
        <button onClick={(e) => {
          e.preventDefault()
          console.log(
            'pokeList; ', pokeList,
            '\npokeFavorites: ', pokeFavorites,
            '\npokeDetails: ', pokeDetails)
          }}>tech</button>
      </div>
    </Link>
  );
};
