import React, { useEffect, useState } from "react";
import InfoContainer from "./InfoContainer";
import SearchBox from "./SearchBox";

import axios from "axios";

interface Pokemon {
  name: string;
  types: Array<string>;
  image: string;
  moves: Array<string>;
}

const Main = () => {
  class PokeTemplate implements Pokemon {
    constructor(
      name: string,
      types: Array<string>,
      image: string,
      moves: Array<string>
    ) {
      this.name = name;
      this.types = types;
      this.image = image;
      this.moves = moves;
    }
    name;
    types;
    image;
    moves;
  }

  const [pokemon, setPokemon] = useState(new PokeTemplate("", [], "", []));
  const [loadStatus, setLoadStatus] = useState(false);

  const randNum: number = Math.floor(Math.random() * 151);

  const fetchPokemon = async () => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${randNum}/`)
      .then(async (response) => {
        const typesArr: Array<string> = [];
        const movesArr: Array<string> = [];

        //Find the "types" and push them to a new array
        await response.data.types.forEach(async (elem: any) => {
          typesArr.push(elem.type.name);
        });

        //Find the "moves" and push them to a new array
        await response.data.moves.forEach(async (elem: any) => {
          movesArr.push(elem.move.name);
        });

        const selectedPokemon = new PokeTemplate(
          response.data.name,
          typesArr,
          response.data.sprites.other["official-artwork"]["front_default"],
          movesArr
        );

        await setPokemon(selectedPokemon);
      })
      .catch((e) => {
        console.log(e);
      });
      await setLoadStatus(true)
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <>
      {!loadStatus && <h1>LOADING...</h1>}
      {loadStatus && <SearchBox />}
      {loadStatus && <InfoContainer pokemon={pokemon} />}
    </>
  );
};

export default Main;
