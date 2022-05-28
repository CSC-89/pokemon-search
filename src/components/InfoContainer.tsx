import React, { useState } from "react";
import capitalise from "./../functions/capitalise";
import transformText from "./../functions/transformText";
import pokeball from '../icons/pokeballBW.svg';
import MoveInfoContainer from './MoveInfoContainer';
import {Pokemon, MoveInterface} from '../interfaces'


interface PokeProps {
  pokemon: Pokemon;
}

class SelectedMove implements MoveInterface {
  constructor(
    selected: boolean,
    id?: number,
    name?: string,
    effectEntries?: string,
    accuracy?: number,
    damageClass?: string ) {
    this.selected = selected;
    this.id = id;
    this.name = name
    this.effectEntries = effectEntries;
    this.accuracy = accuracy;
    this.damageClass = damageClass
    }

    selected;
    id;
    name;
    effectEntries;
    accuracy;
    damageClass;
}

const InfoContainer = (props: PokeProps): JSX.Element => {

  const [selectedMove, setSelectedMove] = useState(new SelectedMove(false))

  const pokemon: Pokemon = props.pokemon


  const clickMoveHandler = (arr: Array<string | number>, e: any) => {
    e.preventDefault()

    const movesAndAbilities = [...props.pokemon.moves, ...props.pokemon.abilities]

    movesAndAbilities.filter((elem: any) => {
      const str: string = transformText(elem.name)
      
      if(str === e.target.outerText){
        setSelectedMove({
          selected: true,
          id: elem.id,
          name: elem.name,
          effectEntries: elem.effectEntries,
          accuracy: elem.accuracy,
          damageClass: elem.damageClass
        })
      }
    })
  }

  const onClose = () => {
    setSelectedMove(new SelectedMove(false))
  }

  return (
    <>      
      {/** Pokemon Info Section */}
      <div className="container mt-5 mx-auto text-center grid justify-center">
        <div className="mb-5 rounded overflow-hidden shadow-lg bg-slate-50">
          <img
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

            {/**Map through types array */}
            {pokemon.types.map((elem: string, index: number) => {
              return (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {capitalise(elem)}
                </span>
              );
            })}
          </div>
        </div>

        {/** Moves List section */}

        {/**Display move/Ability info */}
        {selectedMove.selected && (
      <MoveInfoContainer move={selectedMove} onClose={onClose}/>
      )}

        {/**MOVES/ ABILITIES SECTION */}
        <div className="w-full mx-auto max-w-sm mb-5 rounded overflow-hidden shadow-lg bg-slate-50">
          <h1 className="bg-blue-200 pt-2 pb-2">Moves List</h1>
          <div className="px-6 py-4">
            {/** Map through moves array */}
            {pokemon.moves.map((elem: any, index: number) => {
              return (
                <button key={index} onClick={e => clickMoveHandler(pokemon.moves, e)}><span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {transformText(elem.name)}
                </span></button>
              );
            })}
            <hr></hr>

            <h3 className="text-md mt-5 mb-4"><b>-Abilities-</b></h3>
            {/**Map through Abilities array */}
            
            {pokemon.abilities.length ? pokemon.abilities.map((elem: any, index: number) => {
              return (
                <button key={index} onClick={e => clickMoveHandler(props.pokemon.abilities, e)}><span
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  {transformText(elem.name)}
                </span></button>
              );
            }) : <h6 className="mb-2">None</h6>}

            <img src={pokeball} className="mt-3 mx-auto w-10" alt="pokeball"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoContainer;
