import React from "react";

const svgArrow: JSX.Element = <svg
className="border bg-blue-400 rounded-3xl h-8 w-8 text-white"
width="24"
height="24"
viewBox="0 0 24 24"
stroke-width="2"
stroke="currentColor"
fill="none"
stroke-linecap="round"
stroke-linejoin="round"
>
{" "}
<path stroke="none" d="M0 0h24v24H0z" />{" "}
<line x1="5" y1="12" x2="19" y2="12" />{" "}
<line x1="13" y1="18" x2="19" y2="12" />{" "}
<line x1="13" y1="6" x2="19" y2="12" />
</svg>

const SearchBox = () => {
  return (
    <>
      <div className="container mx-auto text-center flex justify-center w-full">
        <div className="max-w-sm mt-5 pt-5 pb-5 rounded overflow-hidden shadow-lg bg-slate-50 w-full">
          <form>
            <h1>Search by Name</h1>
            <input className="border relative bottom-2 text-center mb-5" type="text"></input>
            <button className="ml-3 mb-5" type="submit">
              {svgArrow}
            </button>
          </form>
          <form>
            <h2>
              <em>Search by Pokedex Number</em>
            </h2>
            <input className="border relative bottom-2 text-center mb-5" type="number"></input>
            <button className="ml-3 mb-5" type="submit">
              {svgArrow}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchBox;
