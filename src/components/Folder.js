import React, { useState } from 'react';
import { Copy, Edit2, Folder2, More, Trash } from 'iconsax-react';
import { Link } from 'react-router-dom';

function Folder({ folder }) {
  const options = [
    { icon: <Edit2 />, label: 'Rename', type: 'rename' },
    // { icon: <Copy />, label: 'Copy', type: 'copy' },
    // { icon: <Copy />, label: 'Move', type: 'move' },
    { icon: <Trash />, label: 'Delete', type: 'delete' },
  ];

  const handleOptionClick = (e, type) => {
    e.preventDefault();
    e.stopPropagation();
    switch (type) {
      case 'rename':
        console.log('rename');
        break;
      case 'delete':
        console.log('delete');
      default:
        break;
    }
  };
  return (
    <Link
      to={`/folder/${folder.id}`}
      className={`relative mx-3 mt-4 flex h-12 items-center rounded border-2 border-slate-500 pl-3 text-slate-700 hover:bg-slate-300 hover:shadow-lg dark:border-opacity-0 dark:bg-slate-800 dark:text-gray-400 dark:hover:border-indigo-500 dark:hover:border-opacity-100 dark:hover:bg-slate-700  dark:hover:text-indigo-200 ${
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
      <button
        className="group absolute right-0.5  rounded-lg py-1 px-0.5 ring-indigo-500 focus:ring-2"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <More className="rotate-90" />
        <div
          className={` absolute  right-0 -z-50 mr-7 min-w-[15rem] translate-y-2 rounded-md  bg-slate-600  p-2 text-lg opacity-0 shadow group-focus:z-10 group-focus:translate-y-0 group-focus:opacity-100 `}
        >
          {options.map((option) => (
            <div
              key={option.type}
              onClick={(e) => handleOptionClick(e, option.type)}
              className="  flex flex-row items-center rounded-md py-2 text-slate-300 hover:bg-slate-200 hover:text-slate-800"
            >
              <span className="mx-2">{option.icon}</span>
              <span className="">{option.label}</span>
            </div>
          ))}
        </div>
      </button>
    </Link>
  );
}

export default Folder;
