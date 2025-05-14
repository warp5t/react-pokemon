
// import { PokeCard } from '../../components/Pokemons/Pokemons';
import { RootState } from '../../store/store';
import style from '../../screens/favorites/Favorites.module.css';
import { useSelector } from 'react-redux';

export const FavoritePokes = () => {
  const favoritesPoke = useSelector((state: RootState) => state.pokeFavorites)
  return (
    <div className={style.favorites}>
      <h2>Favorites</h2>
      <div className={style.favorites__container}>
        {/* {pokeFavorite.map((poke) => (
          <PokeCard key={poke.name} name={poke.name} number={poke.number} />
        ))} */}
      </div>
    </div>
  );
};
