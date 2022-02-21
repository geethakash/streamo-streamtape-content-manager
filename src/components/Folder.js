import React from 'react';
import { Folder2 } from 'iconsax-react';
import { Link, useLocation } from 'react-router-dom';

function Folder({ folder }) {
  
  return (
    <Link to={`/folder/${folder.id}`}>
      <div
        className={`h-12 border-2 dark:border-opacity-0 hover:shadow-lg border-slate-500 text-slate-700 hover:bg-slate-300 dark:hover:bg-slate-700 dark:bg-slate-800 rounded mt-4 mx-3 pl-3 dark:text-gray-400 flex items-center dark:hover:text-purple-400 dark:hover:border-purple-300  dark:hover:border-opacity-100 ${
          !folder.name ? 'pointer-events-none' : ''
        }`}
      >
        <Folder2 className={!folder.name ? 'animate-pulse' : ''} />
        <span className="text-base ml-3 w-9/12 truncate">
          {' '}
          {folder.name ? (
            folder.name
          ) : (
            <div className="w-10/12 h-2 bg-slate-500 rounded-full animate-pulse"></div>
          )}
        </span>
      </div>
    </Link>
  );
}

export default Folder;
