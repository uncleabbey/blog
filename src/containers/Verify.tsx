import React, { useEffect, useState, FormEvent } from 'react';
import '../styles/ThankYou.css';
import { useDispatch } from 'react-redux';
import { RouteComponentProps, Link } from 'react-router-dom';
import { backendUrl } from '../utils/constants';
import axios from 'axios';
import { returnErrors } from '../actions/error';
import NewLoading from '../components/layouts/NewLoading';

const Verify = (
  props: RouteComponentProps,
): React.ReactElement<HTMLDivElement> => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(props.location.search);
  const userId = query.get('userId');
  const token = query.get('token');
  useEffect(() => {
    setLoading(true);
    const verifyUser = async () => {
      try {
        const url = `${backendUrl}/users/verify?userId=${userId}&token=${token}`;
        const { data } = await axios.patch(url);
        console.log(data);
        if (data.status === 'success') {
          setLoading(false);
          setIsVerified(true);
        } else {
          setLoading(false);
          setIsVerified(false);
        }
      } catch (error) {
        console.log(error.response.data.error);
        setLoading(false);
        setIsVerified(false);
      }
    };
    verifyUser();
  }, []);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ndata = {
      email,
    };
    console.log(ndata);
    try {
      setLoading(true);
      const url = `${backendUrl}/users/resend-verification`;
      const { data } = await axios.post(url, ndata);
      if (data.status === 'success') {
        setLoading(false);
        props.history.push('/thanks?type=resend');
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
      {loading && !isVerified ? (
        <NewLoading />
      ) : !loading && isVerified ? (
        <div className="thanks">
          <h5>You account has been verified</h5>
          <p>Please proceed to login</p>
          <Link to="/login">
            <button className="continue">Continue</button>
          </Link>
        </div>
      ) : (
        <div>
          <h6 className="danger">Sorry this token has Expired or is Invalid</h6>
          <form onSubmit={handleSubmit} className="verify-form">
            <p className="bolded">Resend Verification</p>
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
                Resend Verification
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Verify;
