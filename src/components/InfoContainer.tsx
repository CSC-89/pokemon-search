import React, { useState } from "react";
import transformText from "./../functions/transformText";
import pokeball from "../icons/pokeballBW.svg";
import MoveInfoContainer from "./MoveInfoContainer";
import { Pokemon, MoveSelection, Move, Ability , DamageClass} from "../types";

type PokeProps = {
  pokemon: Pokemon;
  getNextorPrev: Function;
}

const InfoContainer = (props: PokeProps): JSX.Element => {
  const [selectedMove, setSelectedMove] = useState<MoveSelection>({selected: false});

  const pokemon: Pokemon = props.pokemon;

  //Type 'Event' throws error for potential nullability.
  const clickMoveHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const movesAndAbilities = [...pokemon.moves, ...pokemon.abilities];

    const selected = movesAndAbilities.filter((elem: Move | Ability): boolean => {
      let button = e.target as HTMLButtonElement;
      const str: string = transformText(elem.name);

      return str === button.outerText;
    });

    setSelectedMove({
      selected: true,
      data: {
        id: selected[0].id,
        name: selected[0].name,
        effectEntries: selected[0]!.effectEntries,
        accuracy: selected[0]!.accuracy as number,
        damageClass: selected[0].damageClass as DamageClass,
      },
    });
  };

  const onClose = () => {
    setSelectedMove({selected: false});
  };

  const getNextorPrevHandler = (e: any) => {
    e.preventDefault();
    console.log(e);
    if (e.target.name === "next") {
      props.getNextorPrev(pokemon.id + 1);
      return;
    } else if (e.target.name === "prev") {
      props.getNextorPrev(pokemon.id - 1);
      return;
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
              {transformText(pokemon.name)}
            </div>
            <div className="mx-auto font-bold text-l"># {pokemon.id}</div>
          </div>
          <div className="mx-auto pb-2">
            <div className="flex justify-between">
              {pokemon.id > 1 ? (
                <button
                  name="prev"
                  className="bg-blue-200 px-4 py-2 mx-2 rounded shadow-md mb-2"
                  type="button"
                  onClick={getNextorPrevHandler}
                >
                  PREV
                </button>
              ) : (
                <div className="px-5 p-5 rounded  mb-2 mx-5"></div>
              )}
              <div>
                {/**Map through TYPES array */}
                {pokemon.types.map((elem: any, index: number) => {
                  return (
                    <span
                      key={index}
                      className={`inline-block ${elem.color} rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2`}
                    >
                      {transformText(elem.name)}
                    </span>
                  );
                })}
              </div>
              {pokemon.id < 898 ? (
                <button
                  name="next"
                  className="bg-blue-200 px-4 py-2 mx-2 rounded shadow-md mb-2"
                  type="button"
                  onClick={getNextorPrevHandler}
                >
                  NEXT
                </button>
              ) : (
                <div className="px-5 p-5 rounded  mb-2 mx-5"></div>
              )}
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
                <button key={index} onClick={(e) => clickMoveHandler(e)}>
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
                  <button key={index} onClick={(e) => clickMoveHandler(e)}>
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
