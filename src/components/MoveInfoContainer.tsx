import React, { FC } from "react";
import transformText from "../functions/transformText";
import pokeball from "../icons/pokeballBW.svg";
import { MoveInterface } from "../interfaces";

interface MoveListProps {
  move: MoveInterface;
  onClose: Function;
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

const MoveInfoContainer: FC<MoveListProps> = ({move, onClose}) => {

  const closeHandler = () => {
    onClose();
  };

  console.log(move.data);

  return (
    <>
    {/** A popup-window component that can be opened and closed via "SelectedMove" state in InfoContainer */}
    <div className="fixed mx-auto w-full border-2 border-slate-200 top-1 left-3 max-w-sm max-h-auto mb-5 rounded overflow-scroll shadow-xl bg-slate-50">
      <div className="flex">
        <h1 className="bg-blue-200 pt-2 pb-2 w-full">
        <span>{move.data!.id}:</span> {transformText(move.data!.name)}
        </h1>
        <button onClick={closeHandler} className="absolute top-1">
          {crossSVG}
        </button>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {move.data!.damageClass ? transformText(move.data!.damageClass.name) : "Ability"}
        </span>

        <div className="mx-auto font-bold text-l">
          Accuracy: {move.data!.accuracy ? move.data!.accuracy : "N/A"}
        </div>
        <div className="mt-3 mx-auto text-md overflow-scroll h-96 rounded shadow-inner border p-2 mb-3">
          {move.data!.effectEntries}
          {/** Some "Effect Entries" data is fairly rough, and hasn't been cleaned. 
            For Example "Pokemon: Meowstic Male (#678) - Move: Secret Power"*/}
        </div>
      </div>
      <img src={pokeball} className="mx-auto w-10 mb-3" alt="pokeball" />
    </div>
    </>
  );
};

export default MoveInfoContainer;
