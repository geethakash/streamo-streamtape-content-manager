import axios from 'axios';
import {
  USER_INFO_FAIL,
  USER_INFO_REQUEST,
  USER_INFO_SUCCESS,
} from '../constants/userConstants';
import { baseUrl } from '../data';

export const userInfo = (login, key) => async (dispatch) => {
  try {
    dispatch({
      type: USER_INFO_REQUEST,
    });

    const { data } = await axios.get(
      `${baseUrl}/account/info/?login=${login}&key=${key}`
    );
    const userInfo = {
      login: data.result.apiid,
      email: data.result.email,
      key,
      signupAt: data.result.signup_at,
    };

    dispatch({
      type: USER_INFO_SUCCESS,
      payload: userInfo,
    });
    console.log();

    localStorage.setItem('userInfo', JSON.stringify(userInfo));
  } catch (error) {
    dispatch({
      type: USER_INFO_FAIL,
      payload: 'Authentication failed!🥺',
    });
  }
};
