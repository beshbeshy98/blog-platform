import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions/authActions';
import { useDispatch } from 'react-redux';

const Navbar = ({ tags }) => {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); 
    };
    return(
        <nav>
            <div className='logo'>
                <h1>My Blog</h1>
            </div>
            <ul className='nav-links'>
                <li><Link to="/">Home</Link></li>
            </ul>
            <button className="logout-button" onClick={handleLogout}>
                Logout
            </button>
        </nav>
    );
};

export default Navbar;
