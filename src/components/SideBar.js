import {
  ArrowRight2,
  DocumentUpload,
  Folder,
  Star,
  Star1,
  User,
} from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function SideBar({ isSideBarOpen, setIsSideBarOpen, location }) {
  return (
    <>
      <button
        className={`fixed top-1/2 z-40 h-12  -translate-y-1/2 rounded-r bg-slate-600  hover:p-1 ${
          isSideBarOpen ? 'translate-x-14' : ''
        }`}
        onClick={() => {
          setIsSideBarOpen(!isSideBarOpen);
        }}
      >
        <ArrowRight2
          size={isSideBarOpen ? 10 : 10}
          className={isSideBarOpen ? 'rotate-180' : ''}
          variant="Bold"
          color="white"
        />
      </button>
      <div
        className={`fixed z-40 flex h-screen w-14 flex-col justify-center  bg-slate-500 dark:bg-[#1e293b] ${
          isSideBarOpen ? '' : '-translate-x-14'
        }`}
      >
        <NavIcon to="/profile" icon={<User />} linkName="Profile" />
        <NavIcon to="/" icon={<Folder />} linkName="Files" />
        <NavIcon to="/starred" icon={<Star1 />} linkName="Starred" />
        <NavIcon to="/upload" icon={<DocumentUpload />} linkName="Upload" />
      </div>
    </>
  );
}

function NavIcon({ to, icon, linkName }) {
  const [isActive, setIsActive] = useState(false);
  let location = useLocation();

  // console.log(location);
  useEffect(() => {
    if (location.pathname == to) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [location]);

  return (
    <NavLink to={to}>
      <div
        className={`group flex h-14 items-center justify-center text-3xl font-extrabold ${
          isActive ? 'pointer-events-none' : 'none'
        }`}
      >
        <div
          className={`flex h-5/6 w-5/6 items-center justify-center rounded-md p-2 hover:bg-gray-700 dark:hover:bg-gray-700  ${
            isActive
              ? 'bg-gray-900 text-gray-400 dark:bg-gray-400 dark:text-gray-900'
              : 'bg-slate-700 text-gray-100 dark:bg-gray-900 dark:text-gray-400 '
          }`}
        >
          {icon}
        </div>
        <div className="absolute translate-x-14  scale-0 rounded-lg bg-gray-700 px-1.5   py-1 text-xs tracking-wider  text-blue-400 group-hover:translate-x-16  group-hover:scale-100">
          {linkName}
        </div>
        <div
          className={`absolute left-0 z-20 h-10 w-[3px] rounded bg-gray-900 dark:bg-purple-600 ${
            isActive ? 'scale-100' : 'scale-0'
          }`}
        ></div>
      </div>
    </NavLink>
  );
}

export default SideBar;
