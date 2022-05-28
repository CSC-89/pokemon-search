import React, { useEffect, useState } from "react";
import InfoContainer from "./InfoContainer";
import SearchBox from "./SearchBox";

import axios from "axios";
import LoadingPage from "./LoadingPage";

interface Pokemon {
  id: number,
  name: string;
  types: Array<string>;
  image: string;
  moves: Array<string>;
}

const Main = () => {
  class PokeTemplate implements Pokemon {
    constructor(
      id: number,
      name: string,
      types: Array<string>,
      image: string,
      moves: Array<string>
    ) {
      this.id = id
      this.name = name;
      this.types = types;
      this.image = image;
      this.moves = moves;
    }
    id;
    name;
    types;
    image;
    moves;
  }

  const [pokemon, setPokemon] = useState(new PokeTemplate(0, "", [], "", []));
  const [loadStatus, setLoadStatus] = useState(false);

  const randNum: number = Math.floor(Math.random() * 898);

  const fetchPokemon = async (input: string | number) => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${input}/`)
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
          response.data.id,
          response.data.name,
          typesArr,
          response.data.sprites.other["official-artwork"]["front_default"],
          movesArr
        );

        await setPokemon(selectedPokemon);
      })
      .catch((e) => {
        alert("Oops, Something went wrong..")
      });
      await setLoadStatus(true)
  };

  useEffect(() => {
    fetchPokemon(randNum);
  }, []);

  //Submission handling to fetch new pokemon
  //Submission of NAME field
  const onSubmitName = async (str: string) => {
    await setLoadStatus(false)
    fetchPokemon(str)
  }

  //Submission of NUMBER Field
  const onSubmitNumber = async (num: number) => {
    await setLoadStatus(false)
    fetchPokemon(num)
    
  }
  ////

  return (
    <>
      <SearchBox submitName={onSubmitName} submitNumber={onSubmitNumber}/>
      {!loadStatus && <LoadingPage />}
      {loadStatus && <InfoContainer pokemon={pokemon} />}
    </>
  );
};

export default Main;
