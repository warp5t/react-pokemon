// import { pokeStat } from '../data/pokemonData';
import style from '../styles/pokemons/Pokemons.module.css';
import favorites from '../assets/icon/star.png';
import comparison from '../assets/icon/arrows.png';
import { PokeCardProps } from '../interfaces/Pokemon';
import { Link } from 'react-router-dom';
import { capitalizing } from '../utils/capitalizer';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { useEffect } from 'react';
import { getInitialPokeThunks, getPagePokeThunks } from '../data/pokeSlice/pokeSlice';
import { AppDispatch } from '../store/store';

export const PokemonsContainer = () => {
  const selectIsPokemonsLoading = useSelector((state: RootState) => state.pokeList.isLoading);
  const selectDataPoke = useSelector((state: RootState) => state.pokeList.data.results || []);
  const error = useSelector((state: RootState) => state.pokeList.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getInitialPokeThunks());
  }, []);

  if (selectIsPokemonsLoading) {
    return <p>Loading pokemons...</p>;
  }
  if (error) return <p>Error: {error}</p>

  return (
    <>
      <div className={style.pokemons}>
        {selectDataPoke.map((poke) => (
          <PokeCard
            key={poke.name}
            name={poke.name}
            number={Number(poke.url.split('/').filter(Boolean).pop() || '0')}
          />
        ))}
      </div>
      <PaginationPoke />
    </>
  );
};

export const PokeCard = ({ name, number }: PokeCardProps) => {
  return (
    <Link to={`/details/${name}`} className={style.pokemons__item}>
      <div className={style.pokemons__wrapTitle}>
        <h3>{capitalizing(name)}</h3>
        <div>#{number}</div>
      </div>
      <div className={style.pokemons__wrapButton}>
        <button onClick={(e) => e.preventDefault()}>
          <img src={favorites} alt='favorites' />
        </button>
        <button onClick={(e) => e.preventDefault()}>
          <img src={comparison} alt='comparison' />
        </button>
      </div>
    </Link>
  );
};

export const PaginationPoke = () => {
  const nextPage = useSelector((state: RootState) => state.pokeList.data.next);
  const previousPage = useSelector((state: RootState) => state.pokeList.data.previous);
  const currentPage = useSelector((state: RootState) => state.pokeList.data.currentPage);
  const ammountPokes = useSelector((state: RootState) => state.pokeList.data.count);
  const ammountPages = Math.ceil(ammountPokes / 20);

  const dispatch = useDispatch<AppDispatch>();

  const setNext = () => {
    if (nextPage) {
      dispatch(getPagePokeThunks({ url: nextPage, actionType: 'next' }))
    }
  };

  const setPrevious = () => {
    if (previousPage) {
      dispatch(getPagePokeThunks({ url: previousPage, actionType: 'previous' }))
    }
  };
  return (
    <div className={style.pokemons__pagination}>
      <div className={style.pokemons__paginationWrap}>
        <button className={style.pokemons__paginationBtn} onClick={setPrevious}>Previous</button>
        <div className={style.pokemons__paginationPage}>{currentPage} - {ammountPages}</div>
        <button className={style.pokemons__paginationBtn} onClick={setNext}>Next</button>
      </div>
    </div>
  );
};
