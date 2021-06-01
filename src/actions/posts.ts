import * as types from './postTypes';
import { returnErrors } from './error';
import { Dispatch } from 'redux';
import axios from 'axios';
import { config, tokenConfig } from '../utils/config';
import { RootState } from '../store';
import { backendUrl } from '../utils/constants';

const baseUrl = `${backendUrl}/posts`;
export const getPosts = (limit: number, page: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.POST_LOADING,
    });
    try {
        const url = `${baseUrl}?limit=${limit}&page=${page}`;
        const res = await axios.get(url, config);
        const {
            data: { posts, count },
        } = res.data;
        // console.log(res.data);
        dispatch({
            type: types.GET_POSTS,
            payload: { posts, count },
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
    }
};
export const getPost = (id: string) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.POST_LOADING,
    });
    try {
        const url = `${baseUrl}/${id}`;
        const res = await axios.get(url, config);
        const {
            data: { post },
        } = res.data;
        // console.log(res.data);
        dispatch({
            type: types.GET_POST,
            payload: { post },
        });
    } catch (error) {
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
    }
};

export const setCurrentPage = (page: number) => ({
    payload: page,
    type: types.GET_PAGE_NO,
});

export const addComment = (postId: string, body: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    const url = `${baseUrl}/${postId}/comments`;
    try {
        const data = JSON.stringify({ body });
        const res = await axios.post(url, data, tokenConfig(getState));
        // console.log(res.data.data);
        dispatch({
            type: types.ADD_COMMENT,
            payload: res.data.data,
        });
    } catch (error) {
        console.log(error.response.data);
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
    }
};
type addPostData = {
    id?: string;
    title: string;
    body: string;
};
export const addPost = ({ title, body }: addPostData) => async (dispatch: Dispatch, getState: () => RootState) => {
    const url = `${baseUrl}`;
    try {
        const data = JSON.stringify({ title, body });
        const res = await axios.post(url, data, tokenConfig(getState));
        // console.log(res.data.data);
        dispatch({
            type: types.ADD_POST,
            payload: res.data.data,
        });
    } catch (error) {
        console.log(error.response.data);
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
    }
};

export const editPost = ({ id, title, body }: addPostData) => async (dispatch: Dispatch, getState: () => RootState) => {
    const url = `${baseUrl}/${id}`;
    try {
        const data = JSON.stringify({ title, body });
        const res = await axios.patch(url, data, tokenConfig(getState));
        dispatch({
            type: types.EDIT_POST,
            payload: res.data.data,
        });
    } catch (error) {
        console.log(error.response.data);
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
    }
};
export const deletePost = (id: string) => async (dispatch: Dispatch, getState: () => RootState) => {
    const url = `${baseUrl}/${id}`;
    try {
        await axios.delete(url, tokenConfig(getState));
        dispatch({
            type: types.DELETE_POST,
            payload: id,
        });
    } catch (error) {
        console.log(error.response.data);
        dispatch(
            returnErrors(
                error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
                error.response && error.response.status ? error.response.status : 500,
            ),
        );
    }
};
