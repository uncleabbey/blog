import * as types from '../actions/types';

const initialState = {
    user: {},
    token: localStorage.getItem('token') || '',
    loading: true,
    error: false,
    isAunthenticated: false,
};

const userReducer = (state = initialState, action: types.UserAction): types.IuserState => {
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
        case types.USER_REG_SUCCESS:
            localStorage.setItem('token', action.token);
            return {
                ...state,
                loading: false,
                token: action.token,
                user: action.user,
                isAunthenticated: true,
                error: false,
            };
        default:
            return state;
    }
};

export default userReducer;
