import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDropzone } from 'react-dropzone';
import { useLocation } from 'react-router-dom';
import { baseUrl } from '../data';

function UploadPage({}) {
  const { search } = useLocation();
  const [uploadUrl, setUploadUrl] = useState('');
  const [folder, setFolder] = useState('');
  var params = {};
  const { userInfo } = useSelector((state) => state.userDetails);

  const getParams = () => {
    const paramsFromGetUrl = search.replace('?', '').split('&');

    if (paramsFromGetUrl) {
      paramsFromGetUrl.map((paramFromGetUrl) => {
        let splitedParam = paramFromGetUrl.split('=');
        params[splitedParam[0]] = splitedParam[1];
      });
    }
  };

  const onDrop = useCallback(() => {
    window.alert('This feature is not available yet!');
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'video/*,video/x-matroska',
  });
  useEffect(() => {
    getParams();

    setUploadUrl(params.url);
    setFolder(params.folder);
  }, []);

  const remoteUpload = async () => {
    try {
      let { data } = await axios.get(
        `${baseUrl}/remotedl/add?login=${userInfo.login}&key=${userInfo.key}${
          folder ? `&folder=${folder}` : ''
        }${uploadUrl ? `&url=${uploadUrl}` : ''}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-white flex  h-full w-full flex-col items-center px-5 lg:flex-row  xl:pr-20">
      <div className="item mt-10 flex w-full flex-col items-center  justify-center border-b-2 border-purple-400 pb-5 md:items-start md:pl-10 lg:w-1/2 lg:border-b-0">
        <h1 className="pt-4 text-2xl font-extrabold text-gray-300 lg:text-3xl">
          Upload
        </h1>
        <form className="mt-5 flex w-full flex-row text-lg">
          <div
            {...getRootProps()}
            className="flex w-full items-center justify-center rounded-lg  bg-purple-500 py-10 md:w-10/12"
          >
            <input {...getInputProps()} />
            <span className="text-slate-100">
              Drag &amp; Drop your files or <span tabIndex="0">Browse</span>
            </span>
          </div>
        </form>
      </div>
      <div className="item mt-10   flex w-full flex-col items-center justify-center px-3 md:items-start md:border-none  lg:w-1/2">
        <h1 className=" text-2xl font-extrabold text-gray-300 lg:text-3xl">
          Remote upload
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            remoteUpload();
          }}
          className="mt-5 flex w-full flex-col text-lg md:flex-row"
        >
          <input
            className="mb-4 h-10 w-full rounded border-2 border-slate-500 bg-transparent px-2 text-slate-300 outline-none  focus:ring focus:ring-purple-600 md:w-3/4 lg:h-14"
            placeholder="Paste file url here..."
            type="url"
            value={uploadUrl || ''}
            onChange={(e) => setUploadUrl(e.target.value)}
          />
          <input
            type="submit"
            className="disabled h-10  rounded bg-purple-600 px-6 text-slate-300 ring-purple-500 hover:bg-purple-800 focus:ring md:mx-3 lg:h-14"
            value="Add URL"
            disabled={!uploadUrl}
          />
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
