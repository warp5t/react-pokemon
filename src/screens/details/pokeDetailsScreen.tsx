import { FC, useEffect } from 'react';
import { PokeStat } from './pokeDetailsScreenType';
import style from '../../screens/details/PokeDetails.module.css';
import { useParams } from 'react-router-dom';
import { capitalizing } from '../../utils/capitalizer';
import { getDetailsPokeThunks } from '../../slicers/pokeDetails/detailsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';

export const PokeDetails: FC<PokeStat> = ({ name, height, weight, sprite, id }) => {
  return (
    <div className={style.pokeStat}>
      <h4 className={style.pokeStat__title}>{capitalizing(name)}</h4>
      <div className={style.pokeStat__subwrap}>
        <div className={style.pokeStat__detail}>Height: {height}</div>
        <div className={style.pokeStat__detail}>Weight: {weight}</div>
      </div>
      <div className={style.pokeStat__wrapImg}>
        <img src={sprite} alt='pokemon' className={style.pokeStat__img} />
      </div>
      <div className={style.pokeStat__detail}>{id}</div>
    </div>
  );
};

export const PokeDetailsScreen = () => {
  const { pokemonName } = useParams<{ pokemonName: string | undefined }>();
  const selectIsPokemonsLoading = useSelector((state: RootState) => state.pokeDetails.isLoading);
  const selectDetailPoke = useSelector((state: RootState) => state.pokeDetails.data);
  const error = useSelector((state: RootState) => state.pokeDetails.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (pokemonName) {
      dispatch(getDetailsPokeThunks({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/` }));
    }
  }, [pokemonName, dispatch]);

  if (error) return <div>Покемон не найден!</div>;
  if (selectIsPokemonsLoading) return <p>Loading pokemon...</p>;

  useEffect(() => {
    if (pokemonName) {
      dispatch(getDetailsPokeThunks({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonName}/` }));
    }
  }, [pokemonName, dispatch]);

  if (error) return <div>Покемон не найден!</div>;
  if (selectIsPokemonsLoading) return <p>Loading pokemon...</p>;

  return (
    <div className={style.details}>
      <PokeDetails
        name={selectDetailPoke.name}
        height={selectDetailPoke.height}
        weight={selectDetailPoke.weight}
        sprite={selectDetailPoke.sprite}
        id={selectDetailPoke.id}
      />
    </div>
  );
};
