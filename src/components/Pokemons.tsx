import { pokeStat } from '../data/pokemonData';
import style from '../styles/pokemons/Pokemons.module.css';
import favorites from '../assets/icon/star.png';
import comparison from '../assets/icon/arrows.png';
import { PokeCardProps } from '../interfaces/Pokemon';

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const PokemonsContainer = () => {
  return (
    <div className={style.pokemons}>
      {pokeStat.map((poke) => (
        <PokeCard key={poke.name} name={poke.name} number={poke.number} />
      ))}
    </div>
  );
};

export const PokeCard = ({ name, number }: PokeCardProps) => {
  return (
    <div
      className={style.pokemons__item}
      onClick={() => {
        console.log(name);
      }}
    >
      <div className={style.pokemons__wrapTitle}>
        <h3>{capitalize(name)}</h3>
        <div>#{number}</div>
      </div>
      <div className={style.pokemons__wrapButton}>
        <button>
          <img src={favorites} alt='favorites' />
        </button>
        <button>
          <img src={comparison} alt='comparison' />
        </button>
      </div>
    </div>
  );
};

export const PaginationPoke = () => {
  return (
    <div className={style.pokemons__pagination}>
      <div className={style.pokemons__paginationWrap}>
        <button className={style.pokemons__paginationBtn}>Previous</button>
        <div className={style.pokemons__paginationPage}>1</div>
        <button className={style.pokemons__paginationBtn}>Next</button>
      </div>
    </div>
  );
};
