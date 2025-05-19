import { TablePoke } from './comparisonType';
import deleteIcon from '../../assets/icon/delete.png';
import style from '../../screens/comparison/Comparision.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

import { capitalizing } from '../../utils/capitalizer';

export const CompareScreen = () => {
  const comparePokemons = useSelector((state: RootState) => state.pokeCompare.data);
  return (
    <div className={style.compareSreen}>
      <h2 className={style.compareSreen__title}>Compare Pokemons</h2>
      <div className={style.compareSreen__cardBox}>
        {/* <button
          onClick={() => {
            console.log('comparePokemons: ', comparePokemons);
          }}
        >
          log
        </button> */}
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

  return (
    <div className={style.pokeContainer}>
      {/* Заголовок с именем и ID */}
      <div className={style.pokeHeader}>
        <h2 className={style.pokeName}>{capitalizing(pokemon.name)}</h2>
        <span className={style.pokeId}>#{pokemon.id}</span>
      </div>

      {/* Основное изображение */}
      <div className={style.pokeImageWrapper}>
        <img src={pokemon.sprite} alt={pokemon.name} className={style.pokeImage} />
      </div>
      <div>
        <button onClick={() => {}}>
          <img src={deleteIcon} alt='delete' />
        </button>
      </div>
      {/* Типы покемона */}
      <div className={style.pokeTypes}>
        {pokemon.types.map((typeObj) => (
          <span key={pokemon.id} className={style.techPlug}>
            {capitalizing(typeObj.type.name)}
          </span>
        ))}
      </div>

      {/* Физические характеристики */}
      <div className={style.pokePhysical}>
        <div className={style.physicalStat}>
          <span className={style.statLabel}>Height:</span>
          <span className={style.statValue}>{formatHeight(pokemon.height)} m</span>
        </div>
        <div className={style.physicalStat}>
          <span className={style.statLabel}>Weight:</span>
          <span className={style.statValue}>{formatWeight(pokemon.weight)} kg</span>
        </div>
      </div>

      {/* Базовые статистики */}
      <div className={style.pokeStats}>
        <h3 className={style.statsTitle}>Base Stats</h3>
        <div className={style.statRow}>
          <span className={style.statName}>HP:</span>
          <div className={style.statBar}>
            <div
              className={style.statBarFill}
              style={{ width: `${(pokemon.stats.hp / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.statValue}>{formatStat(pokemon.stats.hp)}</span>
        </div>
        <div className={style.statRow}>
          <span className={style.statName}>Attack:</span>
          <div className={style.statBar}>
            <div
              className={style.statBarFill}
              style={{ width: `${(pokemon.stats.attack / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.statValue}>{formatStat(pokemon.stats.attack)}</span>
        </div>
        <div className={style.statRow}>
          <span className={style.statName}>Defense:</span>
          <div className={style.statBar}>
            <div
              className={style.statBarFill}
              style={{ width: `${(pokemon.stats.defense / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.statValue}>{formatStat(pokemon.stats.defense)}</span>
        </div>
        <div className={style.statRow}>
          <span className={style.statName}>Speed:</span>
          <div className={style.statBar}>
            <div
              className={style.statBarFill}
              style={{ width: `${(pokemon.stats.speed / 255) * 100}%` }}
            ></div>
          </div>
          <span className={style.statValue}>{formatStat(pokemon.stats.speed)}</span>
        </div>
      </div>

      {/* Способности */}
      <div className={style.pokeAbilities}>
        <h3 className={style.abilitiesTitle}>Abilities</h3>
        <ul className={style.abilitiesList}>
          {pokemon.abilities.map((ability, index) => (
            <li key={`${pokemon.id}-ability-${index}`} className={style.abilityItem}>
              {capitalizing(ability.name)}
              {ability.is_hidden && <span className={style.hiddenTag}>(Hidden)</span>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
