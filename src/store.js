import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer } from './reducers/userReducers';
import { fileListReducer } from './reducers/fileListReducers';

const reducer = combineReducers({
  userDetails: userLoginReducer,
  fileList: fileListReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : [];

const initialState = {
  userDetails: {
    userInfo: userInfoFromLocalStorage,
    fileList: {
      folders: [],
      files: [],
    },
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
