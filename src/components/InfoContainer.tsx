import React, { useState } from "react";
import capitalise from "./../functions/capitalise";
import transformText from "./../functions/transformText";
import pokeball from "../icons/pokeballBW.svg";
import MoveInfoContainer from "./MoveInfoContainer";
import { Pokemon, MoveInterface } from "../interfaces";

interface PokeProps {
  pokemon: Pokemon;
  getNextorPrev: Function;
}

class SelectedMove implements MoveInterface {
  constructor(
    selected: boolean,
    id?: number,
    name?: string,
    effectEntries?: string,
    accuracy?: number,
    damageClass?: string
  ) {
    this.selected = selected;
    this.id = id;
    this.name = name;
    this.effectEntries = effectEntries;
    this.accuracy = accuracy;
    this.damageClass = damageClass;
  }

  selected;
  id;
  name;
  effectEntries;
  accuracy;
  damageClass;
}

const InfoContainer = (props: PokeProps): JSX.Element => {
  const [selectedMove, setSelectedMove] = useState(new SelectedMove(false));

  const pokemon: Pokemon = props.pokemon;

  const clickMoveHandler = (e: any) => {
    e.preventDefault();

    //Merge both arrays together to be filtered through
    const movesAndAbilities = [...pokemon.moves, ...pokemon.abilities];

    const selected = movesAndAbilities.filter((elem: any) => {
      const str: string = transformText(elem.name);

      return str === e.target.outerText
    });

    //Push Selected Move into new object & state
    setSelectedMove({
      selected: true,
      id: selected[0].id,
      name: selected[0].name,
      effectEntries: selected[0].effectEntries,
      accuracy: selected[0].accuracy,
      damageClass: selected[0].damageClass
    })
  };

  const onClose = () => {
    setSelectedMove(new SelectedMove(false));
  };

  const getNextorPrevHandler = (e: any) => {
    e.preventDefault();
    console.log(e)
    if(e.target.name === "next") {
    props.getNextorPrev(pokemon.id + 1);
    return
    } else if (e.target.name === "prev") {
      props.getNextorPrev(pokemon.id - 1);
      return
    }
  };

  return (
    <>
      <div className="container mt-5 mx-auto text-center grid justify-center">

        {/** POKEMON INFO Section */}
        <div className="mb-5 rounded overflow-hidden shadow-lg bg-slate-50">
          <img
            id="image"
            className="mx-auto"
            src={pokemon.image}
            alt={pokemon.name}
          />
          <div className="mx-auto px-6 py-4">
            <div className="mx-auto font-bold text-xl">
              {capitalise(pokemon.name)}
            </div>
            <div className="mx-auto font-bold text-l"># {pokemon.id}</div>
          </div>
          <div className="mx-auto pb-2">
            <div className="flex justify-between">
              <button name="prev" className="bg-blue-200 px-4 py-2 mx-2 rounded shadow-md mb-2" type="button" onClick={getNextorPrevHandler}>PREV</button>
              <div>
                {/**Map through TYPES array */}
{pokemon.types.map((elem: any, index: number) => {
              return (
                <span
                  key={index}
                  className={`inline-block ${elem.color} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
                >
                  {capitalise(elem.name)}
                </span>
              );
            })}
            </div>
            <button name="next" className="bg-blue-200 px-4 py-2 mx-2 rounded shadow-md mb-2" type="button" onClick={getNextorPrevHandler}>NEXT</button>
            </div>

            
          </div>
        </div>

        {/**MOVES/ ABILITIES SECTION */}
        <div className="w-full mx-auto max-w-sm mb-5 rounded overflow-hidden shadow-lg bg-slate-50">
          <h1 className="bg-blue-200 pt-2 pb-2">Moves List</h1>
          <div className="px-6 py-4">

            {/** Map through MOVES array */}
            {pokemon.moves.map((elem: any, index: number) => {
              return (
                <button key={index} onClick={clickMoveHandler}>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    {transformText(elem.name)}
                  </span>
                </button>
              );
            })}
            <hr></hr>

            <h3 className="text-md mt-5 mb-4">
              <b>-Abilities-</b>
            </h3>

            {/**Map through ABILITIES array */}
            {pokemon.abilities.length ? (
              pokemon.abilities.map((elem: any, index: number) => {
                return (
                  <button key={index} onClick={clickMoveHandler}>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      {transformText(elem.name)}
                    </span>
                  </button>
                );
              })
            ) : (
              <h6 className="mb-2">None</h6>
            )}

            <img src={pokeball} className="mt-3 mx-auto w-10" alt="pokeball" />
          </div>
        </div>

        {/** Pop-up window
          Display MOVE/ ABILITY info
           */}
        {selectedMove.selected && (
          <MoveInfoContainer move={selectedMove} onClose={onClose} />
        )}
      </div>
    </>
  );
};

export default InfoContainer;
