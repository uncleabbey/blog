import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Icomment } from '../actions/postTypes';

type IPostProps = {
  _id: string;
  title: string;
  modifiedAt: string;
  author: {
    name: string;
  };
  comments: Icomment[];
};

const Post = ({
  _id,
  title,
  modifiedAt,
  author,
  comments,
}: IPostProps): React.ReactElement<HTMLDivElement> => {
  return (
    <div className="post-card">
      <header>
        <div>
          <img
            src="https://res.cloudinary.com/kayode/image/upload/v1607679190/TransAll/avatar_nw45k6.svg"
            alt="avatar"
          />
        </div>
        <div>
          <p className="author-name">
            {author && author.name ? author.name : ''}
          </p>
        </div>
        <div className="name-date">
          <span>{moment(modifiedAt).startOf('seconds').fromNow()}</span>
        </div>
      </header>
      <div className="post-card-body">
        <Link to={`/posts/${_id}`}>
          <h2>{title}</h2>
        </Link>
      </div>
      <footer className="post-card-footer">
        <Link to={`/posts/${_id}`}>
          <small>
            <FontAwesomeIcon icon={faComment} />
          </small>
          <small className="comment-icon">{comments.length} Comments</small>
        </Link>
      </footer>
    </div>
  );
};

export default Post;
