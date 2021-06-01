import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Page404.css';

const Page404 = (): React.ReactElement<HTMLDivElement> => {
  return (
    <div className="thanks-container">
      <div className="page-404-cont">
        <h1>Oops!</h1>
        <h5>404 PAGE NOT FOUND</h5>
        <small>
          The page you are looking might have been removed had its name changed
          or it is temporary unavailable{' '}
        </small>
        <p>
          <Link to="/">
            {' '}
            <button>GO TO HOMEPAGE</button>{' '}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page404;
