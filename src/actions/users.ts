import * as types from './types';
import { Dispatch, AnyAction } from 'redux';
import axios from 'axios';
// import { tokenConfig } from '../utils/config';
// import { RootState } from '../store';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

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

export const loadUser = (): ThunkAction<Promise<void>, unknown, unknown, AnyAction> => {
    return async (dispatch: ThunkDispatch<unknown, unknown, AnyAction>): Promise<void> => {
        const url = 'http://localhost:5000/api/v1/users/me';
        return new Promise<void>((resolve) => {
            dispatch({
                type: types.LOADING,
            });
            axios.get(url).then((res) => {
                console.log(res.data);
                dispatch({
                    type: types.GET_USER,
                    payload: res.data,
                });
                resolve();
            });
            // .catch((error) => {
            //     console.log(error.response.data);
            //     dispatch({
            //         type: types.USER_ERROR,
            //         payload: error,
            //     });
            //     reject(error);
            // });
        });
    };
};
