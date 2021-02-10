import React, { FormEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from './../components/layouts/Inputs';
import '../styles/Login.css';
import Button from './../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/users';
// import { returnErrors } from '../actions/error';
// import * as types from '../actions/userTypes';
import { RootState } from '../store';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

type FormProps = {
    email: string;
    password: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleBlur: (e: React.FormEvent<HTMLInputElement>) => void;
    emailError: string;
    passwordError: string;
    disabled?: boolean;
};
const Form = ({
    handleSubmit,
    handleChange,
    email,
    password,
    emailError,
    passwordError,
    handleBlur,
    disabled,
}: FormProps) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
                className="input"
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleChange}
                value={email}
                handleBlur={handleBlur}
            />
            <small className="red">{emailError}</small>
        </div>
        <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
                className="input"
                name="password"
                placeholder="Password"
                type="password"
                onChange={handleChange}
                value={password}
                handleBlur={handleBlur}
            />
            ;<small className="red">{passwordError}</small>
        </div>
        <div className="form-group">
            <Button name="Login" type="submit" className="submit-btn" disabled={disabled} />
        </div>
    </form>
);

type LoginProps = {
    location: {
        search: string;
    };
};

const Login = (props: LoginProps): React.ReactElement<HTMLDivElement> => {
    const dispacth = useDispatch();
    const isAunthenticated = useSelector((state: RootState) => state.users.isAunthenticated);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        passwordError: '',
        emailError: '',
    });
    const { email, password } = inputs;
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value,
        });
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            email,
            password,
        };
        dispacth(loginUser(data));
        console.log(data);
    };
    const handleBlur = () => {
        if (email.length === 0) {
            setErrors({
                emailError: 'Email cannot be empty',
                passwordError: '',
            });
        } else if (!validateEmail(email)) {
            setErrors({
                emailError: 'email not valid',
                passwordError: '',
            });
        } else if (password.length === 0) {
            setErrors({
                emailError: '',
                passwordError: 'password cannot be  empty',
            });
        } else if (password.length <= 5) {
            setErrors({
                emailError: '',
                passwordError: 'password must be at least 5 characters',
            });
        } else {
            setErrors({
                emailError: '',
                passwordError: '',
            });
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleLogin = async (res: any) => {
        const {
            profileObj: { email, name },
        } = res;
        const url = 'http://localhost:5000/api/v1/users/google';
        try {
            const body = JSON.stringify({ name, email });
            const config = {
                headers: {
                    'Content-type': 'application/json',
                },
            };
            const res = await axios.post(url, body, config);
            console.log(res.data);
            // const { data } = res.data;
            // dispacth({
            //     type: types.GOOGLE_SUCCESS,
            //     user: data,
            // });
        } catch (error) {
            console.log(error.response.data);
            // dispacth(
            //     returnErrors(
            //         error.response && error.response.data ? error.response.data.error : '!!opps. Something went wrong',
            //         error.response && error.response.status ? error.response.status : 500,
            //     ),
            // );
            // return dispacth({
            //     type: types.LOGIN_FAIL,
            // });
        }
    };

    const query = new URLSearchParams(props.location.search);
    const next = query.get('next');
    if (isAunthenticated) {
        return <Redirect to={next === null ? '/' : `/${next}`} />;
    }
    return (
        <div>
            <div className="login-form">
                <div className="intro">
                    <h5>Welcome to Uncleabbey Blog</h5>
                </div>
                <div className="socials">
                    <GoogleLogin
                        clientId="786652250330-rmpqe6g99ot63af6dujrha271u56vlds.apps.googleusercontent.com"
                        buttonText="Log in with Google"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
                <div className="form-container">
                    <span>Have a Password?</span>
                    <Form
                        passwordError={errors.passwordError}
                        emailError={errors.emailError}
                        email={email}
                        password={password}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        handleBlur={handleBlur}
                        disabled={email.length < 3 || password.length < 5 || !validateEmail(email) ? true : false}
                    />
                    <p>
                        Not Yet Registered <Link to="/register">Sign up Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
