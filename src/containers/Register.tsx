import React, { FormEvent, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Input from './../components/layouts/Inputs';
import '../styles/Login.css';
import Button from './../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/users';
import { RootState } from '../store';

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

type FormProps = {
    email: string;
    name: string;
    password: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    handleBlur: (e: React.FormEvent<HTMLInputElement>) => void;
    emailError: string;
    passwordError: string;
    nameError: string;
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
    name,
    nameError,
}: FormProps) => (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="email">Name</label>
            <Input
                className="input"
                name="name"
                placeholder="Name"
                type="text"
                onChange={handleChange}
                value={name}
                handleBlur={handleBlur}
            />
            <small className="red">{nameError}</small>
        </div>
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
            <small className="red">{passwordError}</small>
        </div>
        <div className="form-group">
            <Button name="Register" type="submit" className="submit-btn" disabled={disabled} />
        </div>
    </form>
);

const Register = (): React.ReactElement<HTMLDivElement> => {
    const dispacth = useDispatch();
    const isAunthenticated = useSelector((state: RootState) => state.users.isAunthenticated);
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({
        passwordError: '',
        emailError: '',
        nameError: '',
    });
    const { email, password, name } = inputs;
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
            name,
        };
        dispacth(registerUser(data));
        console.log(data);
    };
    const handleBlur = () => {
        if (email.length === 0) {
            setErrors({
                emailError: 'Email cannot be empty',
                passwordError: '',
                nameError: '',
            });
        } else if (!validateEmail(email)) {
            setErrors({
                emailError: 'email not valid',
                passwordError: '',
                nameError: '',
            });
        } else if (password.length === 0) {
            setErrors({
                emailError: '',
                passwordError: 'password cannot be  empty',
                nameError: '',
            });
        } else if (name.length === 0) {
            setErrors({
                emailError: '',
                passwordError: '',
                nameError: 'name cannot be  empty',
            });
        } else if (password.length <= 5) {
            setErrors({
                emailError: '',
                passwordError: 'password must be at least 5 characters',
                nameError: '',
            });
        } else if (name.length <= 5) {
            setErrors({
                emailError: '',
                passwordError: '',
                nameError: 'name must be at least 5 characters',
            });
        } else {
            setErrors({
                emailError: '',
                passwordError: '',
                nameError: '',
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
                <div className="socials"></div>
                <div className="form-container">
                    <Form
                        nameError={errors.nameError}
                        name={name}
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
                        Have Registered <Link to="/login">Login Here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
