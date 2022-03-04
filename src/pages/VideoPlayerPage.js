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

  useEffect(() => {
    // dispatch(getFileInfo(params.id));
    generateDlLink();
  }, []);
  const generateDlLink = () => {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Credentials', 'true');

    headers.append('GET', 'POST', 'OPTIONS');
    axios
      .get(
        `${baseUrl}/file/dlticket?login=${userInfo?.login}&key=${userInfo?.key}&file=${params.id}`
      )
      .then((res) => {
        setTimeout(() => {
          // axios
          //   .get(
          //     `${baseUrl}/file/dl?file=${params.id}&ticket=${res.data?.result.ticket}`,
          //     {
          //       mode: 'no-cors',
          //       headers: {
          //         'Access-Control-Allow-Origin': '*',
          //         Accept: 'application/json',
          //         'Content-Type': 'application/json',
          //       },
          //       withCredentials: true,
          //       credentials: 'origin',
          //       crossdomain: true,
          //     }
          //   )
          //   .then((resp) => {
          //     setFileDlLink(resp.data.result.url);
          //   });
          // fetch(
          //   `${baseUrl}/file/dl?file=${params.id}&ticket=${res.data?.result.ticket}`
          // )
          //   .then((response) => response.json())
          //   .then((data) => console.log(data));
          var axios = require('axios');

          var config = {
            method: 'get',
            mode: 'no-cors',
            url: `${baseUrl}/file/dl?file=${params.id}&ticket=${res.data?.result.ticket}`,
            headers: {},
          };

          axios(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
              console.log(error);
            });
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const videourl = document.querySelector('iframe');
  console.log(videourl);

  return (
    <>
      <div className="absolute flex h-full w-full flex-col items-center justify-center  bg-slate-900">
        <button className="focus:animate-vote absolute right-0 top-0 z-40 m-3 rounded-lg border-2 border-slate-500 p-1 text-slate-400 shadow-md hover:border-red-400 hover:text-red-400 hover:shadow-xl">
          <Add className="rotate-45 scale-[140%]" />
        </button>
        <div className="w-8/12">
          {/* <iframe
            src="https://streamtape.com/e/3D0JOlrO71sdyPZ/"
            width="800"
            height="600"
            allowfullscreen
            allowtransparency
            allow="autoplay"
            scrolling="no"
            frameborder="0"
          ></iframe> */}
          <Plyr ref={ref} source={{ type: 'video', src: `${baseUrl}/v/` }} />
          <div className="flex justify-end">
            <div>
              <button className="button-icon hover:border-purple-500 hover:text-purple-500">
                <Star1 />
              </button>
            </div>
            <div>
              <button className=" button-icon hover:border-green-500 hover:text-green-500">
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
