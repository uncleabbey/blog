/* eslint-disable @typescript-eslint/no-explicit-any */
export const USER_REG_SUCCESS = 'USER_REG_SUCCESS';
export const USER_ERROR = 'USER_ERROR';
export const GET_USER = 'GET_USER';
export const LOADING = 'LOADING';
export const LOGIN_SUCCESSS = 'LOGIN_SUCCESSS';
export const GOOGLE_SUCCESS = 'GOOGLE_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const GET_ERRORS = 'GET_ERRORS';

export type UserType = {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
};
export interface IuserState {
    user?: UserType;
    token: string | null;
    loading: boolean;
    error: boolean;
    isAunthenticated: boolean;
}

export interface LoginUserAction {
    type: 'LOGIN_SUCCESSS';
    user: UserType;
    token: string;
}
export interface GoogleAuth {
    type: typeof GOOGLE_SUCCESS;
    user: UserType;
    token: string;
}
export interface LogoutUserAction {
    type: 'LOGOUT';
}
export interface userErrorAction {
    type: 'USER_ERROR';
}
export interface loginErrorAction {
    type: 'LOGIN_FAIL';
    errorMsg: string | null;
}
export interface registerUserAction {
    type: typeof USER_REG_SUCCESS;
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
export interface getErrorAction {
    type: typeof GET_ERRORS;
    payload: {
        msg: string;
        status: string;
    };
}
export type UserAction =
    | LoginUserAction
    | GetUserAction
    | Loading
    | registerUserAction
    | LogoutUserAction
    | userErrorAction
    | loginErrorAction
    | GoogleAuth;
export type ErrorAction = getErrorAction;
