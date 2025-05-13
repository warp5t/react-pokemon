import style from '../Pokemons/Pokemons.module.css';
import favorites from '../../assets/icon/star.png';
import comparison from '../../assets/icon/arrows.png';
import { Link } from 'react-router-dom';
import { capitalizing } from '../../utils/capitalizer';
import { PokeCardProps } from './pokemonsTyoe';
import { useState } from 'react';

const logging = (name: string) => {
  console.log(name);
};

export const PokeCard = ({ name, number }: PokeCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsFavorite(prev => !prev);
  };
  return (
    <Link
      to={`/details/${name}`}
      className={style.pokemons__item}
      onClick={() => {
        logging(name);
      }}
    >
      <div className={style.pokemons__wrapTitle}>
        <h3>{capitalizing(name)}</h3>
        <div>#{number}</div>
      </div>
      <div className={style.pokemons__wrapButton}>
      <button
          onClick={toggleFavorite}
          className={isFavorite ? style.pokemons__btn_active : ''}
        >
          <img src={favorites} alt='favorites' />
        </button>
        <button onClick={(e) => e.preventDefault()}>
          <img src={comparison} alt='comparison' />
        </button>
      </div>
    </Link>
  );
};
