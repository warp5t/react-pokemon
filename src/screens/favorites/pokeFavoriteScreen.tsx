
import { PokeCard } from '../../components/Pokemons/Pokemons';
import { RootState } from '../../store/store';
import style from '../../screens/favorites/Favorites.module.css';
import { useSelector } from 'react-redux';

export const FavoritePokes = () => {

  const favoritesPoke = useSelector((state: RootState) => state.pokeFavorites);

  return (
    <div className={style.favorites}>
      <h2>Favorites</h2>
      <div className={style.favorites__container}>
        {favoritesPoke.pokemons.map((poke) => (
          <PokeCard key={poke.id} name={poke.name} id={poke.id} />
        ))}
      </div>
    </div>
  );
};
