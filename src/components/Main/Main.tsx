import React, { useEffect, useState } from "react";
import InfoContainer from "../InfoContainer";
import SearchBox from "../SearchBox";

import axios from "axios";
import LoadingPage from "../LoadingPage";
import { Move, Pokemon, Ability, Types} from "../../types";

import "./Main.css";

/** 
  Pokemon Tech Challenge
  Tasks: 
  1. Fetch a random pokemon when the user is starting the app, the app should display the pokemon’s name, type, image and moves.
  2. Create a search field that let’s the user search for a pokemon, if you find a result display the same attributes as in the previous task.

  Requirements:
  1. The application must be built with react and typescript.
  2. Styling be done in tailwind (optional).
 */


const Main = () => {
  const [pokemon, setPokemon] = useState<Pokemon>({
    id: 0,
    name: "",
    types: [],
    image: "",
    moves: [],
    abilities: [],
  });
  const [loadStatus, setLoadStatus] = useState(false);

  const randNum: number = Math.floor(Math.random() * 898);

  const fetchPokemon = async (input: string | number) => {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${input}/`)
      .then(async (response) => {
        const typesArr: Array<Types> = [];
        const movesArr: Array<Move> = [];
        const abilitiesArr: Array<Ability> = [];

        //Find the "types" and push them to a new array
        await response.data.types.forEach((elem: any) => {
          typesArr.push({
            name: elem.type.name,
            color: `bg-${elem.type.name}`,
          });
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

        //Set all collected data into a new object
        const selectedPokemon = {
          id: response.data.id,
          name: response.data.name,
          types: typesArr,
          image: response.data.sprites.other["official-artwork"]["front_default"],
          moves: movesArr,
          abilities: abilitiesArr
        };

        console.log(selectedPokemon);

        // Push to state
        await setPokemon(selectedPokemon);
      })
      .catch((e) => {
        alert(
          `${e}\nOops, Something went wrong..\n\n-Please ensure that the NAME was spelled correctly and try again.\n\n-The field that you are using (NAME or NUMBER) cannot be left blank`
        );
      });
    await setTimeout(() => {
      //Avoid async load issues by setting a timeout for the load status change.
      setLoadStatus(true);
    }, 1000);
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

  const getNextorPrev = async (num: number) => {
    await setLoadStatus(false);
    fetchPokemon(num);
  };

  return (
    <>
      {/*Search is constantly in view. Other components are conditional to the load status. */}
      <SearchBox submitName={onSubmitName} submitNumber={onSubmitNumber} />
      {!loadStatus && <LoadingPage />}
      {loadStatus && (
        <InfoContainer getNextorPrev={getNextorPrev} pokemon={pokemon} />
      )}
    </>
  );
};

export default Main;
