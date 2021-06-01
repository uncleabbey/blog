import * as types from '../actions/userTypes';

interface reducerStateI {
  token: string | null;
  loading: boolean;
  error: boolean;
  isAunthenticated: boolean;
  user?: types.UserType;
}
const initialState: reducerStateI = {
  token: localStorage.getItem('token') || '',
  loading: false,
  error: false,
  isAunthenticated: false,
};

const userReducer = (
  state = initialState,
  action: types.UserAction,
): reducerStateI => {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.GET_USER:
      return {
        ...state,
        loading: false,
        user: action.user,
        isAunthenticated: true,
      };
    case types.LOGIN_SUCCESSS:
    case types.GOOGLE_SUCCESS:
      localStorage.setItem('token', action.token);
      return {
        ...state,
        loading: false,
        token: action.token,
        user: action.user,
        isAunthenticated: true,
        error: false,
      };
    case types.USER_ERROR:
    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: true,
        isAunthenticated: false,
        user: undefined,
        token: null,
      };
    case types.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        loading: false,
        user: undefined,
        isAunthenticated: false,
        token: null,
      };
    default:
      return state;
  }
};

export default userReducer;
