import { pokeFavorite } from "../data/pokemonData"
import { PokeCard } from "../components/Pokemons"

export const FavoritePokes = () => {
  return (
    <div>
         {pokeFavorite.map((poke) => (
           <PokeCard
              key={poke.name}
              name={poke.name}
              number={poke.number}
           />
         ))}
    </div>
  )
}