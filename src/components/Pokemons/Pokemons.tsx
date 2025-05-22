import style from '../Pokemons/Pokemons.module.css';
import favorites from '../../assets/icon/star.png';
import comparison from '../../assets/icon/arrows.png';
import { Link } from 'react-router-dom';
import { capitalizing } from '../../utils/capitalizer';
import { PokeCardProps } from './pokemonsTyoe';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../slicers/pokeFavorite/pokeFavorite';
import { getComparePokeThunks, removeComparePokemon } from '../../slicers/pokeCompare/compareSlice';
import { AppDispatch, selectPokeFavorites, selectPokeCompare } from '../../store/store';
import { motion } from 'framer-motion';

export const PokeCard = ({ name, id }: PokeCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const pokeFavorites = useSelector(selectPokeFavorites).pokemons;
  const isFavorite = pokeFavorites.some((pokemon) => pokemon.name === name);
  const pokeCompareData = useSelector(selectPokeCompare).data;
  const isCompare = useSelector(selectPokeCompare).data.some((pokemon) => pokemon.name === name);

  const toggleFavorite = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (isFavorite) {
        dispatch(removeFavorite({ name, id }));
      } else {
        dispatch(addFavorite({ name, id }));
      }
    },
    [dispatch, name, id, isFavorite],
  );

  const toogleCompare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isAlreadyCompared = pokeCompareData.some((poke) => poke.name === name);
    if (isAlreadyCompared) {
      dispatch(removeComparePokemon(Number(id)));
    } else {
      dispatch(getComparePokeThunks({ url: `https://pokeapi.co/api/v2/pokemon/${name}/` }));
    }
  };

  return (
    <Link to={`/details/${name}`} className={style.pokemons__item}>
      <div className={style.pokemons__wrapTitle}>
        <h3>{capitalizing(name)}</h3>
        <div>#{id}</div>
      </div>
      <div className={style.pokemons__wrapButton}>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleFavorite}
          className={isFavorite ? style.pokemons__btn_active : ''}
        >
          <img src={favorites} alt='favorites' />
        </motion.button>
        <motion.button
          whileHover={{
            y: -3,
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
          }}
          whileTap={{
            y: 0,
            boxShadow: '0 5px 10px rgba(0,0,0,0.1)',
          }}
          onClick={toogleCompare}
          className={isCompare ? style.pokemons__btn_active1 : ''}
        >
          <img src={comparison} alt='comparison' />
        </motion.button>
      </div>
    </Link>
  );
};
