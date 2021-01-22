import React, { useState } from 'react';
import './Nav.css';
import Input from './Inputs';
import { NavLink } from 'react-router-dom';
import Button from './../Button';
import getInitial from '../../utils/initials';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logoutUser } from '../../actions/users';

type SearchProps = {
    search: string;
    handleSubmit: (e: React.FormEvent) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
const SearchForm = ({ handleSubmit, handleChange, search }: SearchProps) => (
    <form onSubmit={handleSubmit} className="search-form">
        <Input
            className="search-input"
            name="search"
            onChange={handleChange}
            type="text"
            value={search}
            placeholder="search your favorite topics"
        />
    </form>
);

type LoggedInProps = {
    name: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleClick: () => void;
};
const LoggedIn = ({ name, handleClick }: LoggedInProps) => (
    <>
        <li>
            <span className="initials">{getInitial(name)}</span>
        </li>
        <li>
            <Button name="Logout" className="logout" type="button" onClick={handleClick} />
        </li>
    </>
);

const LoggedOut = () => (
    <>
        <li>
            {' '}
            <NavLink to="/login" className="login-link">
                Login
            </NavLink>{' '}
        </li>
        <li>
            <NavLink to="/signup" className="signup-link">
                Create account
            </NavLink>
        </li>
    </>
);

const Nav = (): React.ReactElement => {
    const isAunthenticated = useSelector((state: RootState) => state.users.isAunthenticated);
    const user = useSelector((state: RootState) => state.users.user);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    const handleLogout = () => {
        dispatch(logoutUser());
    };
    return (
        <div className="header">
            <h3>Uncleabbey</h3>
            <SearchForm search={search} handleChange={handleChange} handleSubmit={handleSubmit} />
            <nav className="nav">
                <ul>
                    {loading ? (
                        ''
                    ) : error ? (
                        <LoggedOut />
                    ) : isAunthenticated && user ? (
                        <LoggedIn name={user.name} handleClick={handleLogout} />
                    ) : (
                        <LoggedOut />
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
