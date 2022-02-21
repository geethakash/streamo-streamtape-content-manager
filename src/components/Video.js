import Axios from 'axios';
import { VideoCircle } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { baseUrl } from '../data';

function Video({ videoDetails }) {
  const [thumbnail, setThumbnail] = useState('');
  const { userInfo } = useSelector((state) => state.userDetails);
  useEffect(() => {
    Axios.get(
      `${baseUrl}/file/getsplash?login=${userInfo?.login}&key=${userInfo?.key}&file=${videoDetails?.linkid}`
    ).then((res) => {
      setThumbnail(res.data.result);
    });
  }, []);
  return (
    <div className="group mt-4 mx-3 rounded-md border-2 border-opacity-0 border-purple-300  hover:border-opacity-100">
      <img className="w-full h-auto rounded-t-md" src={thumbnail} />
      <a href={videoDetails.link} target="_blank">
        <div
          className={`h-10 bottom-0  group-hover:shadow-lg border-slate-500 bg-slate-800 rounded-b-md  pl-3 text-gray-400 flex items-center group-hover:text-purple-400   ${
            !videoDetails.name ? 'pointer-events-none' : ''
          } ${thumbnail ? 'rounded-b-md' : 'rounded'}`}
        >
          <VideoCircle className={!videoDetails.name ? 'animate-pulse' : ''} />
          <span
            className="text-base ml-3 w-9/12 truncate"
            title={videoDetails.name}
          >
            {' '}
            {videoDetails.name ? (
              videoDetails.name
            ) : (
              <div className="w-10/12 h-2 bg-slate-500 rounded-full animate-pulse"></div>
            )}
          </span>
        </div>
      </a>
    </div>
  );
}

export default Video;
