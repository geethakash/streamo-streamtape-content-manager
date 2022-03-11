import Axios from 'axios';
import { VideoCircle } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { baseUrl } from '../data';

function Video({ videoDetails }) {
  let params = useParams();
  const [thumbnail, setThumbnail] = useState(null);
  const { userInfo } = useSelector((state) => state.userDetails);
  useEffect(() => {
    getThumbnail();
  }, []);

  function getThumbnail() {
    Axios.get(
      `${baseUrl}/file/getsplash?login=${userInfo?.login}&key=${userInfo?.key}&file=${videoDetails?.linkid}`
    )
      .then((res) => {
        setThumbnail(res.data.result);
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          if (!thumbnail) {
            getThumbnail();
            console.log('requesting tumbnail for', videoDetails?.name);
          }
        }, 3000);
      });
  }
  return (
    <div className="group mx-3 mt-4 rounded-md border-2 border-purple-300 border-opacity-0  hover:border-opacity-100">
      <img className="h-auto w-full rounded-t-md" src={thumbnail} />
      <Link to={`/video/${videoDetails.linkid}?folder=${params.id}`}>
        <div
          className={`bottom-0 flex  h-10 items-center rounded-b-md border-slate-500 bg-slate-800 pl-3 text-gray-400 group-hover:text-purple-400 group-hover:shadow-lg   ${
            !videoDetails.name ? 'pointer-events-none' : ''
          } ${thumbnail ? 'rounded-b-md' : 'rounded'}`}
        >
          <VideoCircle className={!videoDetails.name ? 'animate-pulse' : ''} />
          <span
            className="ml-3 w-9/12 truncate text-base"
            title={videoDetails.name}
          >
            {' '}
            {videoDetails.name ? (
              videoDetails.name
            ) : (
              <div className="h-2 w-10/12 animate-pulse rounded-full bg-slate-500"></div>
            )}
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Video;
