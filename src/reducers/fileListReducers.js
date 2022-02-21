import {
  FILELIST_FAIL,
  FILELIST_REQUEST,
  FILELIST_RESET,
  FILELIST_SUCCESS,
} from '../constants/fileListConstants';

export const fileListReducer = (state = {}, action) => {
  switch (action.type) {
    case FILELIST_REQUEST:
      return { loading: true };

    case FILELIST_SUCCESS:
      return { loading: false, fileList: action.payload };

    case FILELIST_FAIL:
      return { loading: false, error: action.payload };
    case FILELIST_RESET:
      return { loading: false, fileList: '' };
    default:
      return state;
  }
};
