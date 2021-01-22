/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from './types';
import { Action, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
// import { tokenConfig } from '../utils/config';
// import { RootState } from '../store';
// import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { tokenConfig } from '../utils/config';
import { RootState } from '../store';

interface LoginActionType {
    email: string;
    password: string;
}

export const loginUser = (user: LoginActionType) => async (dispatch: Dispatch) => {
    const url = 'http://localhost:5000/api/v1/users/login';
    // const url = 'https://uncleabbey-blog.herokuapp.com/api/v1/users/login';
    const body = JSON.stringify(user);
    const config = {
        headers: {
            'Content-type': 'application/json',
        },
    };
    try {
        const res = await axios.post(url, body, config);
        console.log(res.data);
        const {
            data: { user, token },
        } = res.data;
        return dispatch({
            type: types.LOGIN_SUCCESSS,
            user,
            token,
        });
    } catch (error) {
        console.log(error.response.data);
        return dispatch({
            type: types.USER_ERROR,
            payload: error,
        });
    }
};
export const getUser = () => async (dispatch: Dispatch) => {
    const url = 'http://localhost:5000/api/v1/users/me';
    // const url = 'https://uncleabbey-blog.herokuapp.com/api/v1/users/login';
    // const body = JSON.stringify(user);
    // const config = {
    //     headers: {
    //         'Content-type': 'application/json',
    //     },
    // };
    try {
        const res = await axios.post(url);
        console.log(res.data);
        const {
            data: { user },
        } = res.data;
        return dispatch({
            type: types.GET_USER,
            user,
        });
    } catch (error) {
        console.log(error.response.data);
        return dispatch({
            type: types.USER_ERROR,
            payload: error,
        });
    }
};

export const loadUser: ThunkAction<void, RootState, unknown, Action<string>> = () => {
    return async (dispatch: (arg0: { type: string; user?: any }) => void, getState: () => RootState) => {
        const url = 'http://localhost:5000/api/v1/users/me';
        try {
            const res = await axios.get(url, tokenConfig(getState));
            dispatch({
                type: types.GET_USER,
                user: res.data.data.user,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: types.USER_ERROR,
            });
        }
    };
};
