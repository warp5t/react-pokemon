import { useEffect } from 'react';
import { getInitialPokeThunks, getPagePokeThunks } from '../../slicers/pokeSlice/pokeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import style from '../list/Pokemons.module.css';
import { PokeCard } from '../../components/Pokemons/Pokemons';

export const PokemonsContainerScreen = () => {
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
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <div className={style.pokemons}>
        {selectDataPoke.map((poke) => (
          <PokeCard
            key={poke.name}
            name={poke.name}
            id={Number(poke.url.split('/').filter(Boolean).pop() || '0')}
          />
        ))}
      </div>
      <PaginationPoke />
    </>
  );
};

export const PaginationPoke = () => {
  const nextPage = useSelector((state: RootState) => state.pokeList.data.next);
  const previousPage = useSelector((state: RootState) => state.pokeList.data.previous);
  const currentPage = useSelector((state: RootState) => state.pokeList.data.currentPage);
  const ammountPokes = useSelector((state: RootState) => state.pokeList.data.count);
  const ammountPages = Math.ceil(ammountPokes / 20);

  const pageInfo = useSelector((state: RootState) => state.pokeList.data);
  const dispatch = useDispatch<AppDispatch>();

  const setNext = () => {
    if (nextPage) {
      dispatch(getPagePokeThunks({ url: nextPage, actionType: 'next' }));
    }
    console.log('page: ', pageInfo);
  };

  const setPrevious = () => {
    if (previousPage) {
      dispatch(getPagePokeThunks({ url: previousPage, actionType: 'previous' }));
    }
  };
  return (
    <div className={style.pokemons__pagination}>
      <div className={style.pokemons__paginationWrap}>
        <button className={style.pokemons__paginationBtn} onClick={setPrevious}>
          Previous
        </button>
        <div className={style.pokemons__paginationPage}>
          {currentPage} - {ammountPages}
        </div>
        <button className={style.pokemons__paginationBtn} onClick={setNext}>
          Next
        </button>
      </div>
    </div>
  );
};
