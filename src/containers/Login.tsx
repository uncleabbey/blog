import React, { FormEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from './../components/layouts/Inputs';
import '../styles/Login.css';
import Button from './../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../actions/users';
import { RootState } from '../store';

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

const Login = (): React.ReactElement<HTMLDivElement> => {
    const dispacth = useDispatch();
    const isAunthenticated = useSelector((state: RootState) => state.users.isAunthenticated);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        passwordError: '',
        emailError: '',
        disabled: false,
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
                emailError: 'length cannot be empty',
                passwordError: '',
                disabled: true,
            });
        } else if (!validateEmail(email)) {
            setErrors({
                emailError: 'email not valid',
                passwordError: '',
                disabled: true,
            });
        } else if (password.length === 0) {
            setErrors({
                emailError: '',
                passwordError: 'password cannot be  empty',
                disabled: true,
            });
        } else if (password.length <= 5) {
            setErrors({
                emailError: '',
                passwordError: 'password must be at least 5 characters',
                disabled: true,
            });
        } else {
            setErrors({
                emailError: '',
                passwordError: '',
                disabled: false,
            });
        }
    };
    if (isAunthenticated) {
        return <Redirect to={'/'} />;
    }
    return (
        <div>
            <div className="login-form">
                <div className="intro">
                    <h5>Welcome to Uncleabbey Blog</h5>
                </div>
                <div className="socials">
                    <div className="google">
                        <img
                            src="https://res.cloudinary.com/kayode/image/upload/v1610797945/google_te8q5j.svg"
                            alt="icon"
                        />
                        Continue with Google
                    </div>
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
                        disabled={errors.disabled}
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
