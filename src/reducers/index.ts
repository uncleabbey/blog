import { combineReducers } from 'redux';
import users from './users';
import error from './error';

const rootReducer = combineReducers({
    users,
    error,
});

export default rootReducer;
