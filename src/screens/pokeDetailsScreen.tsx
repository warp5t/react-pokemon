import { FC } from "react";
import { PokeStat } from "../interfaces/Pokemon";

export const PokeDetails: FC<PokeStat> = ({
  name,
  height,
  weight,
  image,
  number
}) => {
  return (
    <div>
      <h4>{name}</h4>
      <div>
        <div>{height}</div>
        <div>{weight}</div>
      </div>
      <div>
        <img src={image} alt="pokemon" />
      </div>
      <div>{number}</div>
    </div>
  );
};