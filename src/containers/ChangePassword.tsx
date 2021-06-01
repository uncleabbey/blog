import axios from 'axios';
import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { returnErrors } from '../actions/error';
import NewLoading from '../components/layouts/NewLoading';
import { backendUrl } from '../utils/constants';

const ChangePassword = (
  props: RouteComponentProps,
): React.ReactElement<HTMLDivElement> => {
  const query = new URLSearchParams(props.location.search);
  const userId = query.get('userId');
  const token = query.get('token');
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== password2) {
      dispatch(returnErrors('passwords do not match', '400'));
    } else {
      const data = { password, userId, token };
      console.log(data);
      setLoading(true);
      try {
        const url = `${backendUrl}/users/change-password`;
        const res = await axios.patch(url, data);
        if (res.data.status === 'success') {
          setLoading(false);
          props.history.push('/thanks?type="password"');
        }
      } catch (error) {
        setLoading(false);
        dispatch(
          returnErrors(
            error.response && error.response.data
              ? error.response.data.error
              : '!!opps. Something went wrong',
            error.response && error.response.status
              ? error.response.status
              : 500,
          ),
        );
      }
    }
  };
  return (
    <div className="thanks-container">
      <form onSubmit={handleSubmit} className="verify-form">
        <h5 className="bolded">Reset Password</h5>
        <div className="form-group">
          <label>Password</label>
          <input
            placeholder=""
            id="email-input"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            placeholder=""
            id="email-input"
            type="password"
            name="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="resend-btn">
            Change Password
          </button>
        </div>
        {loading && <NewLoading />}
      </form>
    </div>
  );
};

export default ChangePassword;
