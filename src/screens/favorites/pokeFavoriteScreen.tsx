import { pokeFavorite } from '../../data/pokemonData';
import { PokeCard } from '../../components/Pokemons';
import style from '../../styles/favorites/Favorites.module.css';

export const FavoritePokes = () => {
  return (
    <div className={style.favorites}>
      <h2>Favorites</h2>
      <div className={style.favorites__container}>
        {pokeFavorite.map((poke) => (
          <PokeCard key={poke.name} name={poke.name} number={poke.number} />
        ))}
      </div>
    </div>
  );
};
