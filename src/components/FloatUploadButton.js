import React from 'react';
import { Link } from 'react-router-dom';

function FloatUploadButton({ folderId }) {
  return (
    <Link
      to={`/upload${folderId ? `?folder=${folderId}` : ''}`}
      className="group absolute  bottom-10 right-5  text-gray-200 lg:right-10 lg:bottom-10"
    >
      <div className=" relative flex h-14 w-14  items-center justify-center rounded-lg  bg-purple-500   hover:bg-purple-700 lg:p-3">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9.97333 16.0742C9.26268 15.7137 8.47685 15.5264 7.68 15.5275C1.44 15.9675 1.44 25.0475 7.68 25.4875H9.97333M7.74667 15.5275C3.46667 3.62087 21.5067 -1.12579 23.5867 11.3675C29.36 12.1009 31.7067 19.7942 27.32 23.6209C26 24.8342 24.2667 25.5009 22.4667 25.4875H19.78"
            stroke="currentcolor"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21.4133 11.9543C22.1067 11.6076 22.8667 11.4209 23.64 11.4076"
            stroke="currentcolor"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.28 20.3693L14.78 15.7275L10.28 20.3693M14.78 28.7275V15.8575"
            stroke="currentcolor"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <span
        className="
       absolute bottom-0 right-1/2 translate-x-1/2 scale-0  rounded-lg bg-gray-700 px-1.5  py-1 text-xs tracking-wider  text-slate-200 group-hover:-translate-y-16  group-hover:scale-100"
      >
        upload
      </span>
    </Link>
  );
}

export default FloatUploadButton;
