import { pokemon } from "../data/pokemonData";
import { PokeCardProps } from "../interfaces/Pokemon";
import favorites from "../assets/icon/star.png";
import comparison from "../assets/icon/arrows.png";

const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const PokemonsContainer = () => {
  return (
    <div>
    {pokemon.map((poke, index) => (
      <PokeCard
        key={poke.name}
        name={capitalize(poke.name)}
        number={(index + 1).toString()}
      />
    ))}
  </div>
  )
}
const PokeCard = ({name, number}: PokeCardProps) => {
  return (
    <div onClick={() => {console.log(name)}}>
    <h3>{name}</h3>
    <div>#{number}</div>
    <div>
      <button>
        <img src={favorites} alt="favorites" />
      </button>
      <button>
        <img src={comparison} alt="comparison" />
      </button>
    </div>
    </div>
  )
}