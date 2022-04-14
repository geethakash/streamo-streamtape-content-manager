import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { userInfo as userInfoRequest } from '../actions/userActions';
import Spinner from '../components/Spinner';

function UserProfile() {
  const { search } = useLocation();
  var params = {};
  const { userInfo, error, loading } = useSelector(
    (state) => state.userDetails
  );
  const [login, setLogin] = useState(userInfo?.login);
  const [key, setKey] = useState(userInfo?.key);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const getParams = () => {
    const paramsFromGetUrl = search.replace('?', '').split('&');

    if (paramsFromGetUrl) {
      paramsFromGetUrl.map((paramFromGetUrl) => {
        let splitedParam = paramFromGetUrl.split('=');
        params[splitedParam[0]] = splitedParam[1];
      });
    }
    console.log(params);
    if (params.key) {
      setLogin(params.login);
      setKey(params.key);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    getParams();
  }, []);
  useEffect(() => {
    if (login && key) {
      dispatch(userInfoRequest(login, key));
    }
  }, [login, key]);
  return (
    <>
      {loading && (
        <div className="absolute flex h-full  w-full items-center justify-center backdrop-blur">
          <div className="h-20 w-20">
            <Spinner />
          </div>
        </div>
      )}
      {/* <div className="font-white px-5 text-3xl xl:pr-20"> */}
      <h1 className="px-5 pt-4 text-3xl font-extrabold text-gray-300 xl:pr-20">
        Profile
      </h1>
      <div className="flex h-full  w-full items-center justify-center p-3 ">
        <form
          autoComplete="off"
          className=" w-full rounded   border-2 border-gray-600 px-5 py-8 lg:w-1/3"
          onSubmit={submitHandler}
        >
          <h4 className="mb-10 text-center text-2xl font-bold text-slate-600 dark:text-slate-300 ">
            User Informations
          </h4>
          {error && (
            <h6 className="mb-5 rounded bg-red-500 p-2 text-slate-200">
              {/* Authentication credentials were not provided. */}
              {error}
            </h6>
          )}
          {userInfo?.email && (
            <h6 className="mb-5 rounded bg-green-500 p-2 text-slate-100">
              You logged in as{' '}
              <span className="font-bold">{userInfo.email}</span>
            </h6>
          )}
          <div className="group relative  z-0 mb-6 w-full">
            <input
              type="text"
              name="floating_email"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 outline-none autofill:bg-none focus:border-purple-600 focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              placeholder=" "
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <label
              htmlFor="floating_email"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-gray-400 peer-focus:dark:text-purple-500"
            >
              API Id
            </label>
          </div>
          <div className="group relative z-0 mb-6 w-full">
            <input
              type="password"
              name="floating_password"
              id="floating_password"
              className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent py-2.5 px-0 text-sm text-gray-900 outline-none focus:border-purple-600 focus:ring-0 dark:border-gray-600 dark:text-white dark:focus:border-purple-500"
              placeholder=" "
              required
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <label
              htmlFor="floating_password"
              className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-purple-600 dark:text-gray-400 peer-focus:dark:text-purple-500"
            >
              API Key
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-purple-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 sm:w-auto"
          >
            Log in
          </button>
        </form>
      </div>
      {/* </div> */}
    </>
  );
}

export default UserProfile;
