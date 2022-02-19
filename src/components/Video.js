import { VideoCircle } from 'iconsax-react';
import React from 'react';

function Video({ videoTitle }) {
  return (
    <div className="group mt-4 mx-3 rounded-md border-2 border-opacity-0 border-purple-300  hover:border-opacity-100">
      <img
        className="w-full h-auto rounded-t-md"
        src="https://thumb.tapecontent.net/thumb/0djrDqlWdgcb4wp/4mVMYyDPoViyzA.jpg"
      />
      <div
        className={`h-10 bottom-0  group-hover:shadow-lg border-slate-500 bg-slate-800 rounded  pl-3 text-gray-400 flex items-center group-hover:text-purple-400   ${
          !videoTitle ? 'pointer-events-none' : ''
        }`}
      >
        <VideoCircle className={!videoTitle ? 'animate-pulse' : ''} />
        <span className="text-base ml-3 w-full">
          {' '}
          {videoTitle ? (
            videoTitle
          ) : (
            <div className="w-10/12 h-2 bg-slate-500 rounded-full animate-pulse"></div>
          )}
        </span>
      </div>
    </div>
  );
}

export default Video;
