import React from "react";
import transformText from "../functions/transformText";
import pokeball from "../icons/pokeballBW.svg";
import { MoveInterface } from "../interfaces";

interface MoveListProps {
  move: MoveInterface;
  onClose: Function
}

const crossSVG: JSX.Element = (
  <svg
    className="h-8 w-8 text-red-500"
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <line x1="18" y1="6" x2="6" y2="18" />{" "}
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const MoveInfoContainer = (props: MoveListProps) => {
  const move = props.move;

  const closeHandler = () => {
    props.onClose()
  }

  return (
    <div className="fixed md:relative md:mx-auto w-full border-2 border-slate-200 left-3 md:left-0 max-w-sm mb-5 rounded overflow-hidden shadow-xl bg-slate-50">
      <div className="flex">
        <h1 className="bg-blue-200 pt-2 pb-2 w-full">
          {transformText(move.name)}
        </h1>
        <button onClick={closeHandler} className="absolute top-1">
          {crossSVG}
        </button>
      </div>
      <div className="px-6 py-4">
                  {/* {move.map((elem: string, index: number) => {
            return (
              <span
                key={index}
                className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
              >
                {capitalise(elem)}
              </span>
            );
          })} */}
        <div className="mx-auto font-bold text-l">
          Accuracy: {move.accuracy}
        </div>
        <div className="mt-3 mx-auto text-md">{move.effectEntries}</div>
        <img src={pokeball} className="mt-3 mx-auto w-10" alt="pokeball" />
      </div>
    </div>
  );
};

export default MoveInfoContainer;
