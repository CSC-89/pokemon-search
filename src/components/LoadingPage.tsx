import React from 'react';
import pokeball from '../icons/pokeball.svg'

const LoadingPage = () => {
  return (
    <>
          <div className="container mx-auto text-center flex justify-center w-full">
        <div className="max-w-sm mt-5 pt-5 pb-5 rounded overflow-hidden shadow-lg bg-slate-50 w-full">
         <h1 className="mb-5 text-xl"><b>LOADING</b></h1>
         <img src={pokeball} className="load-logo mx-auto mb-5" alt="pokeball-logo" />
        </div>
      </div>
    </>
  );
}

export default LoadingPage;