import React from 'react';
import { Folder2 } from 'iconsax-react';

function Folder({ folderName }) {
  return (
    <div
      className={`h-12 border-2 border-opacity-0 hover:shadow-lg border-slate-500 bg-slate-800 rounded mt-4 mx-3 pl-3 text-gray-400 flex items-center hover:text-purple-400 hover:border-purple-300  hover:border-opacity-100 ${
        !folderName ? 'pointer-events-none' : ''
      }`}
    >
      <Folder2 className={!folderName ? 'animate-pulse' : ''} />
      <span className="text-base ml-3 w-full">
        {' '}
        {folderName ? (
          folderName
        ) : (
          <div className="w-10/12 h-2 bg-slate-500 rounded-full animate-pulse"></div>
        )}
      </span>
    </div>
  );
}

export default Folder;
