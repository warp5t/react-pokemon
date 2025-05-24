import { PokeCard } from '../../components/Pokemons/Pokemons';
import { selectPokeFavorites } from '../../store/store';
import style from '../../screens/favorites/Favorites.module.css';
import { useSelector } from 'react-redux';
import { Modal } from '../../components/Modal/Modal';
import { useState, useEffect } from 'react';
import { modalSwitch } from '../../utils/showModal';
import { selectPokeCompare } from '../../store/store';

export const FavoritePokes = () => {
  const favoritesPoke = useSelector(selectPokeFavorites);
  const [showModal, setShowModal] = useState(false);
  const pokeErrorCompare = useSelector(selectPokeCompare).error;
  const lengthComparePoke = useSelector(selectPokeFavorites).pokemons.length;

  useEffect(() => {
    if (lengthComparePoke >= 2 && pokeErrorCompare === 'Maximum 2 Pokemon for comparison') {
      modalSwitch(setShowModal, showModal);
    }
  }, [pokeErrorCompare]);

  return (
    <div className={style.favorites}>
      {showModal && <Modal toggle={() => modalSwitch(setShowModal, showModal)} />}
      <h2>Favorites</h2>
      <div className={style.favorites__container}>
        {favoritesPoke.pokemons.map((poke) => (
          <PokeCard key={poke.id} name={poke.name} id={poke.id} />
        ))}
      </div>
    </div>
  );
};
