import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import Backdrop from './Backdrop';
import SidenavItems from './SidenavItems';

interface IProps {
    showSidenav: boolean;
    setShowSidenavHnadler: (val: boolean) => void;
    isAuthenticated: boolean;
}

const Sidenav: React.FC<IProps> = ({ showSidenav, setShowSidenavHnadler, isAuthenticated }) => {
    return (
        <Fragment>
            <Backdrop showSidenav={showSidenav} showSidenavHandler={setShowSidenavHnadler} />
            {/* <div className={`sidenav ${showSidenav ? 'open' : ''}`}>
                <div>
                    <SidenavItems isAuthenticated={isAuthenticated} showSidenavHandler={setShowSidenavHnadler} />
                </div>
            </div> */}

            <div className={`sidenav nav-menu-mobile ${showSidenav ? ' open' : ''}`} id="nav-menu-mobile-screen">
                <nav role="navigation" className="nav-menu">
                    <NavLink onClick={() => setShowSidenavHnadler(false)} exact={true} activeClassName="w--current" to="/" aria-current="page" className="nav-link w-nav-link">Home</NavLink>
                    <NavLink onClick={() => setShowSidenavHnadler(false)} activeClassName="w--current" to="/books" className="nav-link w-nav-link">Books</NavLink>
                    {
                        isAuthenticated &&
                        <NavLink onClick={() => setShowSidenavHnadler(false)} activeClassName="w--current" to="/user-books" className="nav-link w-nav-link">My Books</NavLink>
                    }
                    {
                        !isAuthenticated &&
                        <NavLink onClick={() => setShowSidenavHnadler(false)} activeClassName="w--current" to="/login" className="nav-link w-nav-link">Login</NavLink>
                    }
                    {
                        !isAuthenticated &&
                        <NavLink onClick={() => setShowSidenavHnadler(false)} activeClassName="w--current" to="/signup" className="nav-link w-nav-link">Signup</NavLink>
                    }
                    {
                        isAuthenticated &&
                        <NavLink onClick={() => setShowSidenavHnadler(false)} activeClassName="w--current" to="/logout" className="nav-link w-nav-link">Logout</NavLink>
                    }
                </nav>
            </div>
        </Fragment>
    )
}

export default Sidenav
