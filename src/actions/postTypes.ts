export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
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
    body?: string;
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

export type PostAction = IPostLoading | IgetPostsAction | IgetPostAction | setPage;
