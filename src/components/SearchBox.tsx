import React from "react";

const svgArrow: JSX.Element = (
  <svg
    className="border bg-blue-400 rounded-3xl h-8 w-8 text-white z-10"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {" "}
    <path stroke="none" d="M0 0h24v24H0z" />{" "}
    <line x1="5" y1="12" x2="19" y2="12" />{" "}
    <line x1="13" y1="18" x2="19" y2="12" />{" "}
    <line x1="13" y1="6" x2="19" y2="12" />
  </svg>
);

interface searchProps {
  submitName: Function;
  submitNumber: Function;
}

const SearchBox = (props: searchProps) => {
  const nameSubmitHandler = (e: any) => {
    e.preventDefault();
    const name: string = e.target.elements.name.value.toLowerCase();
    props.submitName(name);
  };

  const numberSubmitHandler = (e: any) => {
    e.preventDefault();
    const num: number = e.target.elements.number.value;
    props.submitNumber(num);
  };

  return (
    <>
      <div className="container mx-auto text-center flex justify-center w-full">
        <div className="max-w-sm mt-5 pt-5 pb-5 rounded overflow-hidden shadow-lg bg-slate-50 w-full">
          <form onSubmit={nameSubmitHandler}>
            <h1>Search by Name</h1>
            <input
              name="name"
              className="border relative bottom-2 text-center mb-5"
              type="text"
            ></input>
            <button className="ml-3 mb-5 z-0" type="submit">
              {svgArrow}
            </button>
          </form>
          <form onSubmit={numberSubmitHandler}>
            <h2>
              <em>Search by Pokedex Number</em>
            </h2>
            <input
              name="number"
              className="border w-44 relative bottom-2 text-center"
              type="number"
              max="898"
              min="1"
            ></input>
            <button className="ml-3 z-0" type="submit">
              {svgArrow}
            </button>
            <h6 className="mb-5 text-sm"><em>*Choose between 1 - 898</em></h6>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
