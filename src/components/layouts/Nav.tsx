import React, { useState } from 'react';
import './Nav.css';
import Input from './Inputs';
import { NavLink } from 'react-router-dom';

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

const Nav = (): React.ReactElement => {
    const [search, setSearch] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <div className="header">
            <h3>Uncleabbey</h3>
            <SearchForm search={search} handleChange={handleChange} handleSubmit={handleSubmit} />
            <nav className="nav">
                <ul>
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
                </ul>
            </nav>
        </div>
    );
};

export default Nav;
