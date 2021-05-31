import axios from 'axios';
import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { returnErrors } from '../actions/error';
import NewLoading from '../components/layouts/NewLoading';
import { backendUrl } from '../utils/constants';

const ForgotPassword = (
  props: RouteComponentProps,
): React.ReactElement<HTMLDivElement> => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { email };
    console.log(data);
    setLoading(true);
    try {
      const url = `${backendUrl}/users/forget-password`;
      const res = await axios.post(url, data);
      if (res.data.status === 'success') {
        setLoading(false);
        props.history.push('/thanks');
      }
    } catch (error) {
      setLoading(false);
      dispatch(
        returnErrors(
          error.response && error.response.data
            ? error.response.data.error
            : '!!opps. Something went wrong',
          error.response && error.response.status ? error.response.status : 500,
        ),
      );
    }
  };
  return (
    <div className="thanks-container">
      <form onSubmit={handleSubmit} className="verify-form">
        <p className="bolded">Forgot Your Password?</p>
        <small>
          Please Enter your email so we can send link to reset your password
        </small>
        <div className="form-group">
          <input
            placeholder="Please Enter Your Email Address"
            id="email-input"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="resend-btn">
            Submit
          </button>
        </div>
        {loading && <NewLoading />}
      </form>
    </div>
  );
};

export default ForgotPassword;
