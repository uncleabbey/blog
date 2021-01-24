import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../components/Post';
import { RootState } from '../store';
import { getPosts, setCurrentPage } from './../actions/posts';
// import { IPost } from './../actions/postTypes';
import '../styles/Home.css';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Home = (): React.ReactElement => {
    const dispatch = useDispatch();
    const page = useSelector((state: RootState) => state.posts.page);
    const limit = useSelector((state: RootState) => state.posts.pageSize);
    const count = useSelector((state: RootState) => state.posts.count);
    const posts = useSelector((state: RootState) => state.posts.posts);
    const loading = useSelector((state: RootState) => state.posts.loading);
    const handleClickDown = () => {
        if (page <= 1) {
            dispatch(setCurrentPage(1));
        } else {
            dispatch(setCurrentPage(page - 1));
        }
    };

    const handleClickUp = () => {
        dispatch(setCurrentPage(page + 1));
    };
    useEffect(() => {
        dispatch(getPosts(limit, page));
    }, [page, limit]);
    const pageCeil = Math.ceil(count / limit);
    return (
        <div className="posts-wrapper">
            <div className="posts-container">
                <h1>Posts</h1>
                {loading ? (
                    <p className="loading">Loading ......</p>
                ) : (
                    posts &&
                    posts.map(({ _id, title, author, modifiedAt, comments }) => (
                        <Post
                            key={_id}
                            author={author}
                            title={title}
                            _id={_id}
                            modifiedAt={modifiedAt}
                            comments={comments}
                        />
                    ))
                )}
            </div>
            <div className="pagination">
                <button
                    className="left-btn"
                    disabled={page <= 1 ? true : false}
                    onClick={handleClickDown}
                    type="button"
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>
                <button
                    className="right-btn"
                    onClick={handleClickUp}
                    type="button"
                    disabled={page >= pageCeil ? true : false}
                >
                    <FontAwesomeIcon icon={faAngleRight} color="white" />
                </button>
            </div>
        </div>
    );
};

export default Home;
