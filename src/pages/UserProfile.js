import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userInfo as userInfoRequest } from '../actions/userActions';

function UserProfile() {
  const { userInfo, error } = useSelector((state) => state.userDetails);
  const [login, setLogin] = useState(userInfo?.login);
  const [key, setKey] = useState(userInfo?.key);
  let navigate = useNavigate();

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (login && key) {
      dispatch(userInfoRequest(login, key));
    }
  };
  return (
    // <div className="w-full h-full  flex items-center justify-center backdrop-blur">
    //   <div className="w-20 h-20">
    //     <Spinner />
    //   </div>
    // </div>
    <div className="w-full h-full  flex items-center justify-center p-3 ">
      <form
        autoComplete="off"
        className=" w-full lg:w-1/3   px-5 py-8 rounded border-2 border-gray-600"
        onSubmit={submitHandler}
      >
        <h4 className="text-2xl mb-10 font-bold text-center text-slate-600 dark:text-slate-300 ">
          User Informations
        </h4>
        {error && (
          <h6 className="mb-5 bg-red-500 p-2 rounded text-slate-200">
            {/* Authentication credentials were not provided. */}
            {error}
          </h6>
        )}
        {userInfo?.email && (
          <h6 className="mb-5 bg-green-500 p-2 rounded text-slate-100">
            You logged in as <span className="font-bold">{userInfo.email}</span>
          </h6>
        )}
        <div className="relative z-0  mb-6 w-full group">
          <input
            type="text"
            name="floating_email"
            className="block autofill:bg-none py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            required
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            API Id
          </label>
        </div>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="password"
            name="floating_password"
            id="floating_password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 outline-none focus:ring-0 focus:border-purple-600 peer"
            placeholder=" "
            required
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <label
            htmlFor="floating_password"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            API Key
          </label>
        </div>

        <button
          type="submit"
          className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default UserProfile;
