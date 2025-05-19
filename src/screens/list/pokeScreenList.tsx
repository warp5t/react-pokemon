import { useEffect, useState } from 'react';
import { getInitialPokeThunks, getPagePokeThunks } from '../../slicers/pokeList/pokeSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { AppDispatch } from '../../store/store';
import style from '../list/Pokemons.module.css';
import { PokeCard } from '../../components/Pokemons/Pokemons';
import { Modal } from '../../components/Modal/Modal';

export const PokemonsContainerScreen = () => {
  const selectIsPokemonsLoading = useSelector((state: RootState) => state.pokeList.isLoading);
  const selectDataPoke = useSelector((state: RootState) => state.pokeList.data.results || []);
  const error = useSelector((state: RootState) => state.pokeList.error);
  const dispatch = useDispatch<AppDispatch>();
  const isInitialLoaded = useSelector((state: RootState) => state.pokeList.isInitialLoaded);
  const [showModal, setShowModal] = useState(false);
  const pokeErrorCompare = useSelector((state: RootState) => state.pokeCompare.error);
  const lengthComparePoke = useSelector((state: RootState) => state.pokeFavorites.pokemons.length);

  const modalSwitch = () => {
    setShowModal((showModal) => !showModal);
    const body = document.getElementById('body');
    body?.classList.toggle(style.scrollStop);
  };
  useEffect(() => {
    if (!isInitialLoaded) {
      dispatch(getInitialPokeThunks());
    }
  }, []);

  useEffect(() => {
    if (lengthComparePoke === 2 && pokeErrorCompare === 'Maximum 2 Pokemon for comparison') {
      modalSwitch();
    }
  }, [pokeErrorCompare]);

  if (selectIsPokemonsLoading) {
    return <p>Loading pokemons...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div>{showModal && <Modal toggle={modalSwitch} />}</div>
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
