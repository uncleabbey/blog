import * as types from './postTypes';
// import { RootState } from '../store';
import { returnErrors } from './error';
import { Dispatch } from 'redux';
import axios from 'axios';
import { config } from '../utils/config';

export const getPosts = (limit: number, page: number) => async (dispatch: Dispatch) => {
    dispatch({
        type: types.POST_LOADING,
    });
    try {
        const url = `http://localhost:5000/api/v1/posts?limit=${limit}&page=${page}`;
        const res = await axios.get(url, config);
        const {
            data: { posts, count },
        } = res.data;
        console.log(res.data);
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
        const url = `http://localhost:5000/api/v1/posts/${id}`;
        const res = await axios.get(url, config);
        const {
            data: { post },
        } = res.data;
        console.log(res.data);
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
