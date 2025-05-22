import { useEffect, useState } from 'react';
import { getPagePokeThunks, setInitialData } from '../../slicers/pokeList/pokeSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  AppDispatch,
  selectPokeList,
  selectPokeFavorites,
  selectPokeCompare,
} from '../../store/store';
import style from '../list/Pokemons.module.css';
import { PokeCard } from '../../components/Pokemons/Pokemons';
import { Modal } from '../../components/Modal/Modal';
import { useGetPostsQuery } from '../../firstPageApi/firstPageApi';
import { modalSwitch } from '../../utils/showModal';
import { motion } from "framer-motion";
import { FaHourglassHalf } from "react-icons/fa";

export const PokemonsContainerScreen = () => {
  const selectIsPokemonsLoading = useSelector(selectPokeList).isLoading;
  const selectDataPoke = useSelector(selectPokeList).data.results || [];
  const { data, isLoading, error } = useGetPostsQuery();
  const errorSlice = useSelector(selectPokeList).error;
  const dispatch = useDispatch<AppDispatch>();
  const isInitialLoaded = useSelector(selectPokeList).isInitialLoaded;
  const [showModal, setShowModal] = useState(false);
  const pokeErrorCompare = useSelector(selectPokeCompare).error;
  const lengthComparePoke = useSelector(selectPokeFavorites).pokemons.length;

  useEffect(() => {
    if (data && !isInitialLoaded) {
      dispatch(setInitialData(data));
    }
  }, [data]);

  useEffect(() => {
    if (lengthComparePoke >= 2 && pokeErrorCompare === 'Maximum 2 Pokemon for comparison') {
      modalSwitch(setShowModal, showModal);
    }
  }, [pokeErrorCompare]);

  if (isLoading || selectIsPokemonsLoading) {
    return <motion.div
  animate={{ rotate: 180 }}
  transition={{ repeat: Infinity, duration: 1.5 }}
>
  <FaHourglassHalf size={44} />
</motion.div>
  }
  if (error) {
    return <p>Error: {'message' in error ? error.message : 'Unknown error'}</p>;
  }
  if (errorSlice) {
    return <p>Error: {errorSlice}</p>;
  }

  return (
    <>
      {showModal && <Modal toggle={() => modalSwitch(setShowModal, showModal)} />}
      <div className={style.pokemons}>
        {!isInitialLoaded &&
          data?.results?.map((poke) => (
            <PokeCard
              key={poke.name}
              name={poke.name}
              id={Number(poke.url.split('/').filter(Boolean).pop() || '0')}
            />
          ))}
        {isInitialLoaded &&
          selectDataPoke.map((poke) => (
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
  const nextPage = useSelector(selectPokeList).data.next;
  const previousPage = useSelector(selectPokeList).data.previous;
  const currentPage = useSelector(selectPokeList).data.currentPage;
  const ammountPokes = useSelector(selectPokeList).data.count;
  const ammountPages = Math.ceil(ammountPokes / 20);
  const dispatch = useDispatch<AppDispatch>();

  const setNext = () => {
    if (nextPage) {
      dispatch(getPagePokeThunks({ url: nextPage, actionType: 'next' }));
    }
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
