import { Add, ArrowDown, Star1 } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import Plyr from 'plyr-react';
import { useDispatch, useSelector } from 'react-redux';
import { getFileInfo } from '../actions/fileInfoActions';
import { baseUrl } from '../data';
import axios from 'axios';

function VideoPlayerPage() {
  const { userInfo } = useSelector((state) => state.userDetails);
  const [fileDlLink, setFileDlLink] = useState(null);
  const dispatch = useDispatch();
  const ref = useRef(null);
  let params = useParams();

  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
  headers.append('Access-Control-Allow-Credentials', 'true');

  headers.append('GET', 'POST', 'OPTIONS');
  useEffect(() => {
    // dispatch(getFileInfo(params.id));
    generateDlLink();
  }, []);
  const generateDlLink = () => {
    axios
      .get(
        `${baseUrl}/file/dlticket?login=${userInfo?.login}&key=${userInfo?.key}&file=${params.id}`
      )
      .then((res) => {
        setTimeout(() => {
          axios(
            `${baseUrl}/file/dl?file=${params.id}&ticket=${res.data?.result.ticket}`,
            { credentials: 'include', method: 'GET', headers: headers }
          ).then((resp) => {
            setFileDlLink(resp.data.result.url);
          });
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <button className="focus:animate-vote fixed right-0 z-40 m-3 rounded-lg border-2 border-gray-600 p-1 text-gray-700 shadow-md hover:border-purple-500 hover:text-purple-500 hover:shadow-xl">
        <Add className="rotate-45 scale-[140%]" />
      </button>

      <div className="absolute flex h-full w-full flex-col items-center justify-center  bg-slate-900">
        <div className="w-9/12">
          <Plyr ref={ref} source={{ type: 'video', src: `${baseUrl}/v/` }} />
          <div className="flex justify-end">
            <div>
              <button className="button-icon ">
                <Star1 />
              </button>
            </div>
            <div>
              <button className="focus:animate-vote  m-1 rounded-lg border-[3px] border-gray-500 p-1 text-gray-500 shadow-md hover:border-purple-500 hover:text-purple-500 hover:shadow-xl">
                <ArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoPlayerPage;
