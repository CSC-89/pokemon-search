import React, { useEffect, useState } from "react";
import InfoContainer from "./InfoContainer";
import SearchBox from "./SearchBox";

import axios from "axios";
import LoadingPage from "./LoadingPage";
import { Pokemon } from "../interfaces";

const Main = () => {
  class PokeTemplate implements Pokemon {
    constructor(
      id: number,
      name: string,
      types: Array<string>,
      image: string,
      moves: Array<string | number>[],
      abilities: Array<string | number> []
    ) {
      this.id = id;
      this.name = name;
      this.types = types;
      this.image = image;
      this.moves = moves;
      this.abilities = abilities;
    }
    id;
    name;
    types;
    image;
    moves;
    abilities;
  }

  const [pokemon, setPokemon] = useState(
    new PokeTemplate(0, "", [], "", [], [])
  );
  const [loadStatus, setLoadStatus] = useState(false);

  const randNum: number = Math.floor(Math.random() * 898);

  const fetchPokemon = async (input: string | number) => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${input}/`)
      .then(async (response) => {
        const typesArr: Array<string> = [];
        const movesArr: Array<any> = [];
        const abilitiesArr: Array<any> = [];

        //Find the "types" and push them to a new array
        await response.data.types.forEach((elem: any) => {
          typesArr.push(elem.type.name);
        });

        //Find the "moves" and push them to a new array
        await response.data.moves.forEach((elem: any) => {
          axios.get(elem.move.url).then((response) => {
            movesArr.push({
              id: response.data.id,
              name: response.data.name,
              effectEntries: response.data["effect_entries"][0].effect,
              accuracy: response.data.accuracy,
              damageClass: response.data["damage_class"],
            });
          });
        });

        //Find the "abilities" and push them to a new array
        await response.data.abilities.forEach((elem: any) => {
          axios.get(elem.ability.url).then((response) => {
            abilitiesArr.push({
              id: response.data.id,
              name: response.data.name,
              effectEntries: response.data["effect_entries"][1].effect,
              accuracy: response.data.accuracy,
              damageClass: response.data["damage_class"],
            });
          });
        });

        const selectedPokemon = new PokeTemplate(
          response.data.id,
          response.data.name,
          typesArr,
          response.data.sprites.other["official-artwork"]["front_default"],
          movesArr,
          abilitiesArr
        );

        await setPokemon(selectedPokemon);
      })
      .catch((e) => {
        alert(
          `${e}\nOops, Something went wrong..\n\n-Please ensure that the NAME was spelled correctly and try again.\n\n-The field that you are using (NAME or NUMBER) cannot be left blank`
        );
      });
      await setTimeout(() => {
        setLoadStatus(true);
      }, 300)
    
  };

  useEffect(() => {
    fetchPokemon(randNum);
    // eslint-disable-next-line
  }, []);

  //Submission handling to fetch new pokemon
  //Submission of NAME field
  const onSubmitName = async (str: string) => {
    await setLoadStatus(false);
    fetchPokemon(str);
  };

  //Submission of NUMBER Field
  const onSubmitNumber = async (num: number) => {
    await setLoadStatus(false);
    fetchPokemon(num);
  };
  ////

  return (
    <>
      <SearchBox submitName={onSubmitName} submitNumber={onSubmitNumber} />
      {!loadStatus && <LoadingPage />}
      {loadStatus && <InfoContainer pokemon={pokemon} />}
    </>
  );
};

export default Main;
