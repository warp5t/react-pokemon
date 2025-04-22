import { pokeFavorite } from "../data/pokemonData"


const FavoritePokes = () => {
  return (
    <div>
         {pokeFavorite.map((poke) => (
           <PokeCard
             key={poke.name}
             name={capitalize(poke.name)}
             number={poke.number}
           />
         ))}
    </div>
  )
}