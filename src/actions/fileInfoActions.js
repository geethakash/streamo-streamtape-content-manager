import axios from 'axios';
import {
  FILE_INFO_REQUEST,
  FILE_INFO_SUCCESS,
  FILE_INFO_FAIL,
  FILE_INFO_RESET,
} from '../constants/fileInfoConstants';
import { baseUrl } from '../data';
export const getFileInfo = (fileId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FILE_INFO_REQUEST,
    });

    const {
      userDetails: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `${baseUrl}/file/info/?login=${userInfo.login}&key=${userInfo.key}${
        fileId ? `&file=${fileId}` : ''
      }`
    );
    if (data.status === 200) {
      dispatch({ type: FILE_INFO_SUCCESS, payload: data.result });
    } else {
      dispatch({
        type: FILE_INFO_FAIL,
        payload: data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: FILE_INFO_FAIL,
      payload: 'Something wents wrong!',
    });
  }
};
