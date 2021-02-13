/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import '../styles/AddPost.css';
import { RootState } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { editPost, getPost } from './../actions/posts';
import { returnErrors } from './../actions/error';
import { useHistory, Redirect } from 'react-router-dom';

type Iprops = {
    match: {
        params: {
            id: string;
        };
    };
};
const EditPost = (props: Iprops): React.ReactElement<HTMLDivElement> => {
    const dispatch = useDispatch();
    const post = useSelector((state: RootState) => state.posts.post);
    const isAunthenticated = useSelector((state: RootState) => state.users.isAunthenticated);
    const user = useSelector((state: RootState) => state.users.user);

    const [title, setTitle] = useState(post?.title);
    const [body, setBody] = useState(post?.body);
    const [show, setShow] = useState(false);
    const history = useHistory();
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
            ['link', 'image'],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'bullet',
        'indent',
        'link',
        'image',
    ];

    const handleChangeTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => setTitle(event.target.value);
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id: props.match.params.id,
            title,
            body,
        };
        if (!body || body.length === 0 || !title || title.length === 0) {
            dispatch(returnErrors('Fields can not be empty', '400'));
        } else {
            dispatch(editPost(data));
            history.push(`/posts/${props.match.params.id}`);
        }
    };
    const handleBody = (content: React.SetStateAction<string>) => setBody(content);
    const toggleShow = () => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
        }
    };
    useEffect(() => {
        dispatch(getPost(props.match.params.id));
    }, [props.match.params.id]);
    if (isAunthenticated && user?.email !== post.author.email) {
        return <Redirect to="/" />;
    }
    return (
        <div>
            <div className="create-post-form">
                <div className="add-header">
                    <button className="create-post-btn" onClick={toggleShow}>
                        Edit Post
                    </button>
                    <button className="preview-btn" onClick={toggleShow}>
                        Preview Post
                    </button>
                </div>
                <form onSubmit={handleSubmit} id={show ? 'none' : 'block'}>
                    <div className="form-group">
                        <TextField
                            id="outlined-basic"
                            label="Title"
                            variant="outlined"
                            placeholder="Place The Title Here"
                            className="form-title"
                            onChange={handleChangeTitle}
                            value={title}
                        />
                    </div>
                    <div className="form-group-quill">
                        <ReactQuill
                            theme="snow"
                            placeholder="Place Your Body here"
                            modules={modules}
                            formats={formats}
                            onChange={handleBody}
                            className="form-body"
                            defaultValue={post?.body}
                        />
                    </div>
                    <div className="form-btn-cont">
                        <button type="submit">Edit Post</button>
                    </div>
                </form>
                <section className="preview-cont" id={!show ? 'none' : 'block'}>
                    <h3>{title}</h3>
                    <div className="post-body" dangerouslySetInnerHTML={{ __html: body }} />
                </section>
            </div>
        </div>
    );
};

export default EditPost;
