import * as types from '../actions/postTypes';

interface IpostReducerState {
    loading: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    posts?: types.IPost[];
    post?: types.IPost;
    count: number;
    page: number;
    pageSize: number;
}
const initialState: IpostReducerState = {
    count: 10,
    loading: false,
    page: 1,
    pageSize: 10,
};

const postReducer = (state = initialState, action: types.PostAction): IpostReducerState => {
    switch (action.type) {
        case types.POST_LOADING:
            return {
                ...state,
                loading: true,
            };
        case types.GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload.posts,
                count: action.payload.count,
            };
        case types.GET_PAGE_NO:
            return {
                ...state,
                page: action.payload,
            };
        case types.GET_POST:
            return {
                ...state,
                loading: false,
                post: action.payload.post,
            };
        default:
            return state;
    }
};

export default postReducer;
