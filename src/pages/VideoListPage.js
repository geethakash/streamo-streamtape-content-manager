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

function VideoListPage() {
  const dispatch = useDispatch();
  let location = useLocation();
  let params = useParams();
  let navigate = useNavigate();

  const { fileList } = useSelector((state) => state.fileList);
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
    dispatch(userInfoRequest(userInfo?.login, userInfo?.key));
  }, []);
  return (
    <div className="text-3xl font-white xl:pr-20 px-5">
      <h1 className="text-3xl pt-4 text-gray-300 font-extrabold">Video List</h1>
      {!fileList?.folders.length == 0 && (
        <div className="folder-section">
          <div className="folder-title">
            <span className="pl-2 mb-10">Folders</span>
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
            <span className="pl-2 mb-10">Videos</span>
          </div>
          <div className="folder-container">
            {fileList?.files.map((video) => (
              <Video key={video.linkid} videoDetails={video} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoListPage;
