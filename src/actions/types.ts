export const USER_REG_SUCCESS = 'USER_REG_SUCCESS';
export const USER_ERROR = 'USER_ERROR';
export const GET_USER = 'GET_USER';
export const LOADING = 'LOADING';
export const LOGIN_SUCCESSS = 'LOGIN_SUCCESSS';

export const Start = 'start';
export const Finish = 'finish';
export const Success = 'success';
export const Failure = 'failure';
export const Always = 'always';

export interface IuserState {
    user: {
        _id?: string;
        email?: string;
        isAdmin?: boolean;
        token?: string;
    };
    token: string | null;
    loading: boolean;
    error: boolean;
    isAunthenticated: boolean;
}

type UserType = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
};

export interface LoginUserAction {
    type: 'LOGIN_SUCCESSS';
    user: UserType;
    token: string;
}
export interface registerUserAction {
    type: 'USER_REG_SUCCESS';
    user: UserType;
    token: string;
}
export interface Loading {
    type: 'LOADING';
}

export interface GetUserAction {
    type: 'GET_USER';
    user: UserType;
}

export type UserAction = LoginUserAction | GetUserAction | Loading | registerUserAction;
