import React from 'react';
import { Folder2 } from 'iconsax-react';
import { Link, useLocation } from 'react-router-dom';

function Folder({ folder }) {
  return (
    <Link
      to={`/folder/${folder.id}`}
      className={`mx-3 mt-4 flex h-12 items-center rounded border-2 border-slate-500 pl-3 text-slate-700 hover:bg-slate-300 hover:shadow-lg dark:border-opacity-0 dark:bg-slate-800 dark:text-gray-400 dark:hover:border-purple-300 dark:hover:border-opacity-100 dark:hover:bg-slate-700  dark:hover:text-purple-400 ${
        !folder.name ? 'pointer-events-none' : ''
      }`}
    >
      <Folder2 className={!folder.name ? 'animate-pulse' : ''} />
      <span className="ml-3 w-9/12 truncate text-base">
        {' '}
        {folder.name ? (
          folder.name
        ) : (
          <div className="h-2 w-10/12 animate-pulse rounded-full bg-slate-500"></div>
        )}
      </span>
    </Link>
  );
}

export default Folder;
