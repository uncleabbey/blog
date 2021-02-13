export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const EDIT_POST = 'EDIT_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_PAGE_NO = 'GET_PAGE_NO';
export const POST_LOADING = 'POST_LOADING';

export interface Icomment {
    _id: string;
    body: string;
    createdAt: string;
    user: {
        name: string;
        _id: string;
    };
}

export interface IPost {
    title: string;
    body: string;
    modifiedAt: string;
    _id: string;
    author: {
        _id?: string;
        email?: string;
        name: string;
    };
    comments: Icomment[];
}
export interface IPostLoading {
    type: typeof POST_LOADING;
}
export interface IgetPostsAction {
    type: typeof GET_POSTS;
    payload: {
        posts: IPost[];
        count: number;
    };
}
export interface IgetPostAction {
    type: typeof GET_POST;
    payload: {
        post: IPost;
    };
}
export interface setPage {
    type: typeof GET_PAGE_NO;
    payload: number;
}

export interface IaddComment {
    type: typeof ADD_COMMENT;
    payload: Icomment;
}

export interface IAddPost {
    type: typeof ADD_POST;
    payload: IPost;
}
export interface IEditPost {
    type: typeof EDIT_POST;
    payload: IPost;
}
export interface IdeletePost {
    type: typeof DELETE_POST;
    payload: string;
}

export type PostAction =
    | IPostLoading
    | IgetPostsAction
    | IgetPostAction
    | setPage
    | IaddComment
    | IAddPost
    | IEditPost
    | IdeletePost;
