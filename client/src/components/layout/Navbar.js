import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/authContext';
import TaskContext from '../context/task/taskContext';

const Navbar = ({ title, icon }) => {
    const authContext = useContext(AuthContext);
    const taskContext = useContext(TaskContext);

    const { isAuthenticated, logout, user } = authContext;
    const { clearTasks } = taskContext;

    const onLogout = () => {
        logout();
        clearTasks();
    }

    const authLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm">Logout</span>
                </a>
            </li>

        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li>
                <Link to='/register' >Register</Link>
            </li>
            <li>
                <Link to='/login' >Login</Link>
            </li>
        </Fragment>
    )

    return (
        <div className='navbar bg-primary' >
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                <li>
                    { isAuthenticated ? authLinks : guestLinks }
                    {/* <Link to='/' >Home</Link>
                    <Link to='/about' >About</Link>
                    <Link to='/register' >Register</Link>
                    <Link to='/login' >Login</Link> */}
                </li>
            </ul>
        </div>
    )
}

Navbar.prototype = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Task App',
    icon: 'fas fa-duotone fa-calendar-check'
}

export default Navbar;