import React from 'react';
import '../styles/ThankYou.css';
import { RouteComponentProps, Link } from 'react-router-dom';

const ThankYou = (
  props: RouteComponentProps,
): React.ReactElement<HTMLDivElement> => {
  const query = new URLSearchParams(props.location.search);
  const type = query.get('type');

  return (
    <div className="thanks-container">
      {type === 'register' ? (
        <div className="thanks">
          <h5>Thank you for registering on Uncleabbey Blog</h5>
          <p>Check your mail for the next step</p>
          <Link to="/login">
            <button className="continue">Continue</button>
          </Link>
        </div>
      ) : type === 'password' ? (
        <div className="thanks">
          <h5>Password Changed</h5>
          <p>Proceed to login with the new password</p>
          <Link to="/login">
            <button className="continue">Continue</button>
          </Link>
        </div>
      ) : type === 'resend' ? (
        <div className="thanks">
          <h5>Verification Resent</h5>
          <p>Verification details has been sent to your mail</p>
        </div>
      ) : (
        <div className="thanks">
          <h5>Mail Sent</h5>
          <p>A reset email has been sent to your mail</p>
        </div>
      )}
    </div>
  );
};

export default ThankYou;
