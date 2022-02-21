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
        className={`fixed top-1/2 -translate-y-1/2  h-12 hover:p-1 rounded-r  bg-slate-600 ${
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
        className={`w-14 bg-slate-500 dark:bg-[#1e293b] h-screen fixed flex  flex-col justify-center ${
          isSideBarOpen ? '' : '-translate-x-14'
        }`}
      >
        <NavIcon to="/profile" icon={<User />} linkName="Profile" />
        <NavIcon to="/" icon={<Folder />} linkName="Files" />
        <NavIcon to="/starred" icon={<Star1 />} linkName="Starred" />
        <NavIcon to="/Upload" icon={<DocumentUpload />} linkName="Upload" />
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
        className={`group h-14 font-extrabold text-3xl flex justify-center items-center ${
          isActive ? 'pointer-events-none' : 'none'
        }`}
      >
        <div
          className={`w-5/6 h-5/6 rounded-md hover:bg-gray-700 p-2 flex justify-center items-center  ${
            isActive
              ? 'dark:bg-gray-400 bg-gray-900 dark:text-gray-900 text-gray-400'
              : 'bg-slate-700 text-gray-100 dark:bg-gray-900 dark:text-gray-400 '
          }`}
        >
          {icon}
        </div>
        <div className="text-xs absolute translate-x-16 px-1.5 py-1 bg-gray-700 rounded-lg scale-0 text-blue-400 group-hover:scale-100 tracking-wider">
          {linkName}
        </div>
        <div
          className={`absolute z-20 h-10 w-[3px] bg-gray-900 dark:bg-purple-600 left-0 rounded ${
            isActive ? 'scale-100' : 'scale-0'
          }`}
        ></div>
      </div>
    </NavLink>
  );
}

export default SideBar;
