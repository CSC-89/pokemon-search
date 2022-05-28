import React from "react";
import { capitalise } from "./../functions/capitalise";

interface Pokemon {
  id: number;
  name: string;
  types: Array<string>;
  image: string;
  moves: Array<string>;
}

interface PokeProps {
  pokemon: Pokemon;
}

const InfoContainer = (props: PokeProps): JSX.Element => {
  return (
    <>
      {/** Pokemon Info Section */}
      <div className="container mt-5 mx-auto text-center grid justify-center">
        <div className="mb-5 rounded overflow-hidden shadow-lg bg-slate-50">
          <img
            className="mx-auto"
            src={props.pokemon.image}
            alt={props.pokemon.name}
          />
          <div className="mx.auto px-6 py-4">
            <div className="mx-auto font-bold text-xl">
              {capitalise(props.pokemon.name)}
            </div>
            <div className="mx-auto font-bold text-l"># {props.pokemon.id}</div>
          </div>
          <div className="-mx-auto pb-2">
            {/**Map through types array */}
            {props.pokemon.types.map((elem: string, index: number) => {
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
        <div className="w-full mx-auto max-w-sm mb-5 rounded overflow-hidden shadow-lg bg-slate-50">
          <h1 className="bg-blue-200 pt-2 pb-2">Moves List</h1>
          <div className="px-6 py-4">
            {/** Map through moves array */}
            {props.pokemon.moves.map((elem: string, index: number) => {
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
      </div>
    </>
  );
};

export default InfoContainer;
