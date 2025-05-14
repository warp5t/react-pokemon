import style from '../Pokemons/Pokemons.module.css';
import favorites from '../../assets/icon/star.png';
import comparison from '../../assets/icon/arrows.png';
import { Link } from 'react-router-dom';
import { capitalizing } from '../../utils/capitalizer';
import { PokeCardProps } from './pokemonsTyoe';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../slicers/pokeFavorite/pokeFavorite';
import { AppDispatch, RootState } from '../../store/store';

const logging = (name: string) => {
  console.log(name);
};

export const PokeCard = ({ name, id }: PokeCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const pokeFavorites = useSelector((state: RootState) => state.pokeFavorites.pokemons);
  const isFavorite = pokeFavorites.some(pokemon => pokemon.name === name);

  const toggleFavorite = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isFavorite) {
      dispatch(removeFavorite({name, id}));
    } else {
      dispatch(addFavorite({name, id}));
    }
  }, [dispatch, name, id, isFavorite]);

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
        <div>#{id}</div>
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
      </div>
        {/* <button onClick={(e) => {
          e.preventDefault()
          console.log('pokeFavorites: ', pokeFavorites)
          }}>tech</button> */}
    </Link>
  );
};
