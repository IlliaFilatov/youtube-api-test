import videoReducer from './videoReducer';
import isAuthorized from './isAuth';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  videos: videoReducer,
  isAuth: isAuthorized
});

export default allReducers;