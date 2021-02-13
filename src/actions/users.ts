/* eslint-disable @typescript-eslint/no-explicit-any */
import * as types from './userTypes';
import { Dispatch } from 'redux';
import axios from 'axios';
import { tokenConfig } from '../utils/config';
import { RootState } from '../store';
import { returnErrors } from './error';

interface LoginActionType {
    email: string;
    password: string;
}

// const baseUrl = 'http://localhost:5000/api/v1/users';
const baseUrl = 'https://uncleabbey-blog.herokuapp.com/api/v1/users';

export const loginUser = (user: LoginActionType) => async (dispatch: Dispatch) => {
    const url = `${baseUrl}/login`;
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
        // console.log(error.response.data);
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
export const registerUser = (user: LoginActionType) => async (dispatch: Dispatch) => {
    const url = `${baseUrl}/register`;
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
            type: types.USER_REG_SUCCESS,
            user,
            token,
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
            type: types.REGISTER_FAIL,
        });
    }
};

export const getUser = () => async (dispatch: Dispatch, getState: () => RootState) => {
    const url = `${baseUrl}/me`;
    try {
        const res = await axios.get(url, tokenConfig(getState));
        const { data } = res.data;
        // console.log(user);
        return dispatch({
            type: types.GET_USER,
            user: data,
        });
    } catch (error) {
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

export const logoutUser = () => (dispatch: Dispatch) => dispatch({ type: types.LOGOUT });

interface GoogleI {
    name: string;
    email: string;
}
export const googleAuth = ({ name, email }: GoogleI) => async (dispatch: Dispatch) => {
    const url = `${baseUrl}/google`;
    try {
        const body = JSON.stringify({ name, email });
        const config = {
            headers: {
                'Content-type': 'application/json',
            },
        };
        const res = await axios.post(url, body, config);
        console.log(res.data);
        const {
            data: { user, token },
        } = res.data;
        return dispatch({
            type: types.GOOGLE_SUCCESS,
            user,
            token,
        });
    } catch (error) {
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
