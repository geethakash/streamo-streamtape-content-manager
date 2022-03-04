import {
  FILE_INFO_FAIL,
  FILE_INFO_REQUEST,
  FILE_INFO_RESET,
  FILE_INFO_SUCCESS,
} from '../constants/fileInfoConstants';

export const fileInfoReducer = (state = {}, action) => {
  switch (action.type) {
    case FILE_INFO_REQUEST:
      return { loading: true };

    case FILE_INFO_SUCCESS:
      return { loading: false, fileList: action.payload };

    case FILE_INFO_FAIL:
      return { loading: false, error: action.payload };
    case FILE_INFO_RESET:
      return { loading: false, fileList: { folders: [], files: [] } };
    default:
      return state;
  }
};
