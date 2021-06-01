import React, { useState } from 'react';
import './Nav.css';
import Input from './Inputs';
import { NavLink } from 'react-router-dom';
import Button from './../Button';
import getInitial from '../../utils/initials';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logoutUser } from '../../actions/users';
import { faHamburger, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  handleClick: () => void;
  handleClose: () => void;
};
const LoggedIn = ({ name, handleClick, handleClose }: LoggedInProps) => (
  <>
    <li className="add-post" onClick={handleClose}>
      <NavLink to="/create" className="add-post-link">
        Create a Post
      </NavLink>
    </li>
    <li>
      <span className="initials">{getInitial(name)}</span>
    </li>
    <li>
      <Button
        name="Logout"
        className="logout"
        type="button"
        onClick={handleClick}
      />
    </li>
  </>
);

type LoggedOutProps = {
  handleClose: () => void;
};

const LoggedOut = ({ handleClose }: LoggedOutProps) => (
  <>
    <li onClick={handleClose}>
      {' '}
      <NavLink to="/login" className="login-link">
        Login
      </NavLink>{' '}
    </li>
    <li onClick={handleClose}>
      <NavLink to="/register" className="signup-link">
        Register
      </NavLink>
    </li>
  </>
);

const Nav = (): React.ReactElement => {
  const isAunthenticated = useSelector(
    (state: RootState) => state.users.isAunthenticated,
  );
  const user = useSelector((state: RootState) => state.users.user);
  const loading = useSelector((state: RootState) => state.users.loading);
  const error = useSelector((state: RootState) => state.users.error);
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [show, toggleShow] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    toggleShow(false);
  };
  const handleToggle = () => {
    if (show) {
      toggleShow(false);
    } else {
      toggleShow(true);
    }
  };
  const handleClose = () => {
    toggleShow(false);
  };
  return (
    <div className="header">
      <div className="flex">
        <NavLink to="/">
          <img
            src="https://res.cloudinary.com/kayode/image/upload/v1622302766/demo/logo_kotfpn.png"
            alt="logo"
            className="logo"
          />
        </NavLink>{' '}
        <SearchForm
          search={search}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <FontAwesomeIcon
        icon={show ? faTimes : faHamburger}
        className="hamburger"
        onClick={handleToggle}
      />
      <nav className="nav" id={show ? 'show' : 'hide'}>
        <ul>
          {loading ? (
            ''
          ) : error ? (
            <LoggedOut handleClose={handleClose} />
          ) : isAunthenticated && user ? (
            <LoggedIn
              name={user.name}
              handleClick={handleLogout}
              handleClose={handleClose}
            />
          ) : (
            <LoggedOut handleClose={handleClose} />
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
