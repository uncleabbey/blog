import * as types from '../actions/postTypes';

interface IpostReducerState {
  loading: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  posts: types.IPost[];
  post: types.IPost;
  count: number;
  page: number;
  pageSize: number;
  comments: types.Icomment[];
}
const initialState: IpostReducerState = {
  count: 10,
  loading: false,
  page: 1,
  pageSize: 10,
  comments: [],
  posts: [],
  post: {
    _id: '',
    author: {
      _id: '',
      email: '',
      name: '',
    },
    comments: [],
    body: '',
    modifiedAt: '',
    title: '',
  },
};

const postReducer = (
  state = initialState,
  action: types.PostAction,
): IpostReducerState => {
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
        comments: action.payload.post.comments,
      };
    case types.ADD_COMMENT:
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case types.EDIT_POST:
      return {
        ...state,
        loading: false,
        post: action.payload,
      };
    case types.ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case types.DELETE_POST:
      const index = state.posts.findIndex(
        (post) => post._id === action.payload,
      );
      state.posts.splice(index, 1);
      return {
        ...state,
        posts: state.posts,
      };
    default:
      return state;
  }
};

export default postReducer;
