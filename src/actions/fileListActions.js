import axios from 'axios';
import { useSelector } from 'react-redux';
import {
  FILELIST_FAIL,
  FILELIST_REQUEST,
  FILELIST_SUCCESS,
} from '../constants/fileListConstants';
import { baseUrl } from '../data';

export const getFileList = (folderId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FILELIST_REQUEST,
    });

    const {
      userDetails: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `${baseUrl}/file/listfolder/?login=${userInfo.login}&key=${userInfo.key}${
        folderId ? `&folder=${folderId}` : ''
      }`
    );
    if (data.status === 200) {
      dispatch({
        type: FILELIST_SUCCESS,
        payload: { folderId, data: data.result },
      });
    } else {
      dispatch({
        type: FILELIST_FAIL,
        payload: data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: FILELIST_FAIL,
      payload: 'Something wents wrong!',
    });
  }
};
