import style from '../Pokemons/Pokemons.module.css';
import favorites from '../../assets/icon/star.png';
import comparison from '../../assets/icon/arrows.png';
import { Link } from 'react-router-dom';
import { capitalizing } from '../../utils/capitalizer';
import { PokeCardProps } from './pokemonsTyoe';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../slicers/pokeFavorite/pokeFavorite';
import { AppDispatch, RootState } from '../../store/store';
import { getComparePokeThunks } from '../../slicers/pokeCompare/compareSlice';
import { removeComparePokemon } from '../../slicers/pokeCompare/compareSlice';


const logging = (name: string) => {
  console.log(name);
};

export const PokeCard = ({ name, id }: PokeCardProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const pokeFavorites = useSelector((state: RootState) => state.pokeFavorites.pokemons);
  const isFavorite = pokeFavorites.some((pokemon) => pokemon.name === name);
  const pokeCompareData = useSelector((state: RootState) => state.pokeCompare.data);
  const pokeErrorCompare = useSelector((state: RootState) => state.pokeCompare.error);
  const isCompare = useSelector((state: RootState) =>
    state.pokeCompare.data.some(pokemon => pokemon.name === name));

  useEffect(() => {
    console.log('link is changed: ', pokeErrorCompare);

  },[pokeErrorCompare])


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
    e.preventDefault()
    const isAlreadyCompared = pokeCompareData.some(poke => poke.name === name);
    if (isAlreadyCompared) {
      dispatch(removeComparePokemon(Number(id)));
    } else {
      dispatch(getComparePokeThunks({ url: `https://pokeapi.co/api/v2/pokemon/${name}/` }));
    }
  }



  const infoLOG = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log('pokeCompareData: ', pokeCompareData);
    console.log('pokeErrorCompare: ', pokeErrorCompare);
  }

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
        <button onClick={infoLOG}>statPoke</button>
      </div>
      <div className={style.pokemons__wrapButton}>
        <button onClick={toggleFavorite} className={isFavorite ? style.pokemons__btn_active : ''}>
          <img src={favorites} alt='favorites' />
        </button>
        <button onClick={toogleCompare} className={isCompare ? style.pokemons__btn_active1 : ''}>
          <img src={comparison} alt='comparison' />
        </button>
      </div>
    </Link>
  );
};
