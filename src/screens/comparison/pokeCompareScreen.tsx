import { TablePoke } from './comparisonType';
import deleteIcon from '../../assets/icon/delete.png';
import style from '../../screens/comparison/Comparision.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { removeComparePokemon } from '../../slicers/pokeCompare/compareSlice';
import { capitalizing } from '../../utils/capitalizer';

export const CompareScreen = () => {
  const comparePokemons = useSelector((state: RootState) => state.pokeCompare.data);
  return (
    <div className={style.compareSreen}>
      <h2 className={style.compareSreen__title}>Compare Pokemons</h2>
      <div className={style.compareSreen__cardBox}>
        {comparePokemons.map((poke) => (
          <PokeStatTable pokemon={poke} key={poke.id} />
        ))}
      </div>
    </div>
  );
};

export const PokeStatTable: React.FC<TablePoke> = ({ pokemon }) => {
  const formatStat = (value: number) => value.toString().padStart(3, ' ');
  const formatWeight = (weight: number) => (weight / 10).toFixed(1);
  const formatHeight = (height: number) => (height / 10).toFixed(1);
  const dispatch = useDispatch<AppDispatch>()


  return (
    <div className={style.pokeTable}>
      {/* Header with name and ID */}
      <div className={style.pokeTable__header}>
        <h2 className={style.pokeTable__name}>{capitalizing(pokemon.name)}</h2>
        <span className={style.pokeTable__id}>#{pokemon.id}</span>
      </div>

      {/* Main image */}
      <div className={style.pokeTable__imageWrapper}>
        <img src={pokemon.sprite} alt={pokemon.name} className={style.pokeTable__image} />
      </div>

      {/* Delete button */}
      <div className={style.pokeTable__delete}>
        <button onClick={() => {dispatch(removeComparePokemon(pokemon.id))}} className={style.pokeTable__deleteButton}>
          <img src={deleteIcon} alt='delete' className={style.pokeTable__deleteIcon} />
        </button>
      </div>

      {/* Types pokemon's */}
      <div className={style.pokeTable__types}>
        {pokemon.types.map((typeObj) => (
          <span key={pokemon.id} className={style.pokeTable__type}>
            {capitalizing(typeObj.type.name)}
          </span>
        ))}
      </div>

      {/* Physical characteristics */}
      <div className={style.pokeTable__physical}>
        <div className={style.pokeTable__physicalStat}>
          <span className={style.pokeTable__label}>Height:</span>
          <span className={style.pokeTable__value}>{formatHeight(pokemon.height)} m</span>
        </div>
        <div className={style.pokeTable__physicalStat}>
          <span className={style.pokeTable__label}>Weight:</span>
          <span className={style.pokeTable__value}>{formatWeight(pokemon.weight)} kg</span>
        </div>
      </div>

      {/* Base stats */}
      <div className={style.pokeTable__stats}>
        <h3 className={style.pokeTable__statsTitle}>Base Stats</h3>

        <div className={style.pokeTable__statRow}>
          <span className={style.pokeTable__statName}>HP:</span>
          <div className={style.pokeTable__statBar}>
            <div
              className={style.pokeTable__statBarFill}
              style={{ width: `${(pokemon.stats.hp / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.pokeTable__value}>{formatStat(pokemon.stats.hp)}</span>
        </div>

        <div className={style.pokeTable__statRow}>
          <span className={style.pokeTable__statName}>Attack:</span>
          <div className={style.pokeTable__statBar}>
            <div
              className={style.pokeTable__statBarFill}
              style={{ width: `${(pokemon.stats.attack / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.pokeTable__value}>{formatStat(pokemon.stats.attack)}</span>
        </div>

        <div className={style.pokeTable__statRow}>
          <span className={style.pokeTable__statName}>Defense:</span>
          <div className={style.pokeTable__statBar}>
            <div
              className={style.pokeTable__statBarFill}
              style={{ width: `${(pokemon.stats.defense / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.pokeTable__value}>{formatStat(pokemon.stats.defense)}</span>
        </div>

        <div className={style.pokeTable__statRow}>
          <span className={style.pokeTable__statName}>Speed:</span>
          <div className={style.pokeTable__statBar}>
            <div
              className={style.pokeTable__statBarFill}
              style={{ width: `${(pokemon.stats.speed / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.pokeTable__value}>{formatStat(pokemon.stats.speed)}</span>
        </div>
      </div>

      {/* Abilities */}
      <div className={style.pokeTable__abilities}>
        <h3 className={style.pokeTable__abilitiesTitle}>Abilities</h3>
        <ul className={style.pokeTable__abilitiesList}>
          {pokemon.abilities.map((ability, index) => (
            <li key={`${pokemon.id}-ability-${index}`} className={style.pokeTable__abilityItem}>
              {capitalizing(ability.name)}
              {ability.is_hidden && <span className={style.pokeTable__hiddenTag}>(Hidden)</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

