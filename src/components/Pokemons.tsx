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
import { getInitialPokeThunks } from '../data/pokeSlice/pokeSlice';
import { AppDispatch } from '../store/store';

export const PokemonsContainer = () => {
  const isLoading = useSelector((state: RootState) => state.pokeList.isLoading);
  const dataPoke = useSelector((state: RootState) => state.pokeList.data.results || []);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getInitialPokeThunks());
    console.log(dataPoke)
  }, []);

  if (isLoading) {
    return <p>Loading pokemons...</p>;
  }
console.log('dataPoke: ', dataPoke)
  return (
    <div className={style.pokemons}>
    {dataPoke.map((poke) => (
      <PokeCard
        key={poke.name}
        name={poke.name}
        number={poke.url.split('/').filter(Boolean).pop() || '0'}
      />
    ))}
  </div>
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
  return (
    <div className={style.pokemons__pagination}>
      <div className={style.pokemons__paginationWrap}>
        <button className={style.pokemons__paginationBtn}>Previous</button>
        <div className={style.pokemons__paginationPage}>1</div>
        <button className={style.pokemons__paginationBtn}>Next</button>
      </div>
    </div>
  );
};
