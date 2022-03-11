import Folder from '../components/Folder';
import React, { useEffect } from 'react';
import { listfolder } from '../data';
import Spinner from '../components/Spinner';
import Video from '../components/Video';
import { useDispatch, useSelector } from 'react-redux';
import { getFileList } from '../actions/fileListActions';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { userInfo as userInfoRequest } from '../actions/userActions';
import { USER_INFO_FAIL } from '../constants/userConstants';
import FloatUploadButton from '../components/FloatUploadButton';

function VideoListPage() {
  const dispatch = useDispatch();
  let location = useLocation();
  let params = useParams();
  let navigate = useNavigate();

  const { fileList, loading } = useSelector((state) => state.fileList);
  const { userInfo, error } = useSelector((state) => state.userDetails);
  useEffect(() => {
    dispatch(getFileList(params.id));
  }, [params.id]);
  useEffect(() => {
    if (!userInfo?.email) {
      dispatch({
        type: USER_INFO_FAIL,
        payload: 'Authentication credentials were not found!',
      });
      return navigate('/profile');
    }
    // dispatch(userInfoRequest(userInfo?.login, userInfo?.key));
  }, []);
  return (
    <>
      {loading && (
        <div className="absolute z-40 flex h-full  w-full items-center justify-center backdrop-blur">
          <div className="h-20 w-20">
            <Spinner />
          </div>
        </div>
      )}
      <div className="font-white px-5 text-3xl xl:pr-20">
        <h1 className="pt-4 text-3xl font-extrabold text-gray-300">
          Video List
        </h1>
        {!fileList?.folders.length == 0 && (
          <div className="folder-section">
            <div className="folder-title">
              <span className="mb-10 pl-2">Folders</span>
            </div>

            <div className="folder-container">
              {fileList?.folders.map((folder) => (
                <Folder key={folder.id} folder={folder} />
              ))}
            </div>
          </div>
        )}

        {!fileList?.files.length == 0 && (
          <div className="folder-section">
            <div className="folder-title">
              <span className="mb-10 pl-2">Videos</span>
            </div>
            <div className="folder-container">
              {fileList?.files.map((video) => (
                <Video key={video.linkid} videoDetails={video} />
              ))}
            </div>
          </div>
        )}
      </div>
      <FloatUploadButton folderId={params.id} />
    </>
  );
}

export default VideoListPage;
