import { Add, ArrowDown, Star1 } from 'iconsax-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  useParams,
  Link,
  useHistory,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Plyr from 'plyr-react';
import { useDispatch, useSelector } from 'react-redux';
import { getFileInfo } from '../actions/fileInfoActions';
import { baseUrl } from '../data';
import axios from 'axios';
import { data } from 'autoprefixer';

function VideoPlayerPage() {
  const { search } = useLocation();
  const { userInfo } = useSelector((state) => state.userDetails);
  const [userAccept, setUserAccept] = useState(false);
  const [fileInfo, setFileInfo] = useState({});
  const [parameters, setParameters] = useState({});
  const dispatch = useDispatch();
  const ref = useRef(null);
  let params = useParams();

  useEffect(() => {
    getFileInfo();
    getParams();
    // dispatch(getFileInfo(params.id));
    // generateDlLink();
  }, [params.id]);

  const getParams = () => {
    const paramsFromGetUrl = search.replace('?', '').split('&');

    if (paramsFromGetUrl) {
      paramsFromGetUrl.map((paramFromGetUrl) => {
        let splitedParam = paramFromGetUrl.split('=');
        console.log(splitedParam);
        parameters[splitedParam[0]] = splitedParam[1];
      });
      console.log(parameters);
    }
  };

  const getFileInfo = async () => {
    let { data } = await axios.get(
      `${baseUrl}/file/info?file=${params.id}&login=${userInfo?.login}&key=${userInfo?.key}`
    );
    await setFileInfo(data.result[params.id]);
  };
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
          var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: {},
          };

          fetch(
            `${baseUrl}/file/dl?file=${params.id}&ticket=${res.data?.result.ticket}`,
            requestOptions
          )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log('error', error));
        }, 5000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="relative flex h-full w-full flex-col items-center justify-center  bg-slate-900">
        <Link
          to={`/folder/${parameters['folder']}`}
          className="focus:animate-vote absolute right-0 top-0 z-40 m-3 rounded-lg border-2 border-slate-500 p-1 text-slate-400 shadow-md hover:border-red-400 hover:text-red-400 hover:shadow-xl"
        >
          <Add className="rotate-45 scale-[140%]" />
        </Link>
        <div className="absolute top-0 left-0 my-3 ml-8 w-3/4 truncate text-xl font-bold text-slate-300">
          {fileInfo.name}
        </div>
        <div className="w-full md:w-8/12">
          {userAccept ? (
            <iframe
              src={`https://streamtape.com/e/${params.id}/`}
              allowFullScreen
              allow="autoplay"
              scrolling="no"
              frameBorder="0"
              className="aspect-video w-full text-white md:rounded-lg"
            ></iframe>
          ) : (
            <div className="flex aspect-video w-full flex-col items-center justify-center rounded-lg border-2 border-red-500  text-purple-400 md:rounded-lg">
              <span className="text-2xl text-red-400">
                You may experience ads here.
              </span>
              <span>
                Please{' '}
                <a
                  href="https://chrome.google.com/webstore/detail/adblock-%E2%80%94-best-ad-blocker/gighmmpiobklfepjocnamgkkbiglidom"
                  target="_blank"
                  className="border-b border-purple-300  hover:text-purple-300"
                >
                  install AD Blocker
                </a>{' '}
                to prevent from ads
              </span>
              <button
                onClick={() => setUserAccept(true)}
                className=" my-3 rounded-lg bg-purple-600 p-3 text-slate-200 hover:bg-purple-800"
              >
                Continue Anyway
              </button>
            </div>
          )}

          <div className="mt-2 flex justify-center md:justify-end">
            <div>
              <a
                href={`https://streamtape.com/v/${params.id}/`}
                target="_blank"
              >
                <div className="button-icon hover:border-purple-500 hover:text-purple-500">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_202_3)">
                      <path
                        d="M25 15.3756V21.6756C25 26.9256 22.9 29.0256 17.65 29.0256H11.35C6.1 29.0256 4 26.9256 4 21.6756V15.3756C4 10.1256 6.1 8.02563 11.35 8.02563H17.65"
                        stroke="currentcolor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20.1666 4.74366L27.3691 5.001L27.6264 12.2035M15.3494 17.0205L27.2718 5.09826"
                        stroke="currentcolor"
                        strokeWidth="2"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                  </svg>
                </div>
              </a>
            </div>
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
