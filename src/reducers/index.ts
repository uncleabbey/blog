import { combineReducers } from 'redux';
import users from './users';
import error from './error';
import posts from './posts';

const rootReducer = combineReducers({
  users,
  error,
  posts,
});

export default rootReducer;
