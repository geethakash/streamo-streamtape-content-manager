import React from 'react';

function Spinner() {
  return (
    <div className="w-full h-full p-2 ">
      <div className=" animate-spin w-full h-full rounded-full border-l-2  border-t-2 border-red-300 "></div>
    </div>
  );
}

export default Spinner;
