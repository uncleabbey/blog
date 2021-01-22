/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from './types';
import { Dispatch } from 'redux';
import axios from 'axios';
import { tokenConfig } from '../utils/config';
import { RootState } from '../store';
import { returnErrors } from './error';

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
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
        return dispatch({
            type: types.LOGIN_FAIL,
        });
    }
};

export const getUser = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const url = 'http://localhost:5000/api/v1/users/me';
    try {
        const res = await axios.get(url, tokenConfig(getState));
        console.log(res.data);
        const { data } = res.data;
        // console.log(user);
        return dispatch({
            type: types.GET_USER,
            user: data,
        });
    } catch (error) {
        console.log(error.response.data);
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
        return dispatch({
            type: types.USER_ERROR,
        });
    }
};

<<<<<<< HEAD
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
=======
export const logoutUser = () => (dispatch: Dispatch) => dispatch({ type: types.LOGOUT });

export const googleAuth = () => async (dispatch: Dispatch) => {
    const url = 'http://localhost:5000/api/v1/users/google';
    try {
        const res = await axios.get(url);
        console.log(res.data);
        const { data } = res.data;
        // console.log(user);
        return dispatch({
            type: types.GET_USER,
            user: data,
        });
    } catch (error) {
        // console.log(error.response.data);
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
        return dispatch({
            type: types.USER_ERROR,
        });
    }
>>>>>>> 291cf7c22a4685487f3082ad19d5ece5dae6e52a
};
