import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { addComment, getPost } from './../actions/posts';
import '../styles/PostDetails.css';
import moment from 'moment';
import { Icomment } from './../actions/postTypes';
import { Link } from 'react-router-dom';

import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type IForm = {
    commentBody?: string;
    handleChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleClick?: () => void;
    handleSubmit?: (e: React.FormEvent) => void;
};
const CommentForm = ({ commentBody, handleChange, handleClick, handleSubmit }: IForm) => {
    return (
        <form onClick={handleClick} onSubmit={handleSubmit}>
            <div>
                <img
                    className="avatar"
                    src="https://res.cloudinary.com/kayode/image/upload/v1607679190/TransAll/avatar_nw45k6.svg"
                    alt="avatar"
                />
            </div>
            <textarea name="comment" value={commentBody} onChange={handleChange}></textarea>
            <div>
                <button type="submit" className="comment-button">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </button>
            </div>
        </form>
    );
};

const Comment = ({ _id, body, createdAt, user }: Icomment) => (
    <div className="comment-cont" key={_id}>
        <div>
            <img
                className="avatar"
                src="https://res.cloudinary.com/kayode/image/upload/v1607679190/TransAll/avatar_nw45k6.svg"
                alt="avatar"
            />
        </div>
        <div className="comment-cont-body">
            <p>
                {user.name}{' '}
                <span>
                    {moment(createdAt).format('MMM Do')} ({moment(createdAt).startOf('hour').fromNow()})
                </span>
            </p>
            <div className="comment-body-wrapper">{body}</div>
        </div>
    </div>
);

type Iprops = {
    match: {
        params: {
            id: string;
        };
    };
};
const PostDetails = (props: Iprops): React.ReactElement<HTMLDivElement> => {
    const post = useSelector((state: RootState) => state.posts.post);
    const comments = useSelector((state: RootState) => state.posts.comments);
    const loading = useSelector((state: RootState) => state.posts.loading);
    const isAutheticated = useSelector((state: RootState) => state.users.isAunthenticated);
    const dispatch = useDispatch();

    const [commentBody, setCommentBody] = useState('');
    // const [display, setDisplay] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCommentBody(e.target.value);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // const data = {
        //     body: commentBody,
        // };
        // console.log(data);
        dispatch(addComment(props.match.params.id, commentBody));
        setCommentBody('');
    };
    useEffect(() => {
        dispatch(getPost(props.match.params.id));
    }, [props.match.params.id]);
    return (
        <>
            <div className="modal fade" id="exampleModal3" aria-labelledby="exampleModalLabel3" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <section className="loginPrompt">
                                <div>
                                    <div>
                                        <h4>You Are Logged In</h4>
                                        <small>Only Login Users can comment</small>
                                        <Link to="/login">Login</Link>{' '}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
            <div className="posts-wrapper">
                <div className="post-details-cont">
                    {loading ? (
                        <div className="loading-container">
                            <span>Loading.......</span>
                        </div>
                    ) : (
                        <div className="post-details">
                            <header>
                                <h1>{post?.title}</h1>
                                <section className="author-details">
                                    <div>
                                        <img
                                            className="avatar"
                                            src="https://res.cloudinary.com/kayode/image/upload/v1607679190/TransAll/avatar_nw45k6.svg"
                                            alt="avatar"
                                        />
                                    </div>
                                    <span className="author-details-name">{post?.author.name}</span>
                                    <span className="author-details-date">
                                        {moment(post?.modifiedAt).format('Do MMM YY')}
                                    </span>
                                </section>
                            </header>
                            <main className="post-details-body">
                                <div className="post--body" dangerouslySetInnerHTML={{ __html: post.body }} />
                                {/* {post?.body} */}
                            </main>
                        </div>
                    )}
                    <hr />
                    <footer className="post-details-footer">
                        <h3>Discussion</h3>
                        {isAutheticated ? (
                            <CommentForm
                                commentBody={commentBody}
                                handleChange={handleChange}
                                handleSubmit={handleSubmit}
                            />
                        ) : (
                            <div data-toggle="modal" data-target="#exampleModal3">
                                <CommentForm />
                            </div>
                        )}

                        <div className="comment-container">
                            {comments
                                ? comments.map(({ _id, body, user, createdAt }) => (
                                      <Comment key={_id} _id={_id} body={body} user={user} createdAt={createdAt} />
                                  ))
                                : ''}
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
};

export default PostDetails;
