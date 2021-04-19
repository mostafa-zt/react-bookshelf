import React, { Fragment, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link, NavLink } from 'react-router-dom'
import Sidenav from './Sidenav'

interface IProps {
    isAuthenticated: boolean,
    userEmail: string
}

const Navbar: React.FC<IProps> = ({ isAuthenticated, userEmail }) => {

    const [showSidenav, setShowSidenav] = useState<boolean>(false);

    return (
        <Fragment>
            <Sidenav showSidenav={showSidenav} setShowSidenavHnadler={setShowSidenav} isAuthenticated={isAuthenticated} />
            <div className="menu-wrapper">
                <div role="banner" className="navbar w-nav">
                    <div className="container">
                        <div className="nav-wrapper">
                            <Link to="/" aria-current="page" className="brand w-nav-brand active">
                                <img src="./images/bookshelf-icon.png" alt="Bookshelf" />
                            </Link>
                            <div className="menu-nav-wrapper">
                                <nav role="navigation" className="nav-menu">
                                    <NavLink exact={true} activeClassName="w--current" to="/" aria-current="page" className="nav-link w-nav-link">Home</NavLink>
                                    <NavLink activeClassName="w--current" to="/books" className="nav-link w-nav-link">Books</NavLink>
                                    {
                                        isAuthenticated &&
                                        <NavLink activeClassName="w--current" to="/user-books" className="nav-link w-nav-link">My Books</NavLink>
                                    }
                                    {
                                        !isAuthenticated &&
                                        <NavLink activeClassName="w--current" to="/login" className="nav-link w-nav-link">Login</NavLink>
                                    }
                                    {
                                        !isAuthenticated &&
                                        <NavLink activeClassName="w--current" to="/signup" className="nav-link w-nav-link">Signup</NavLink>
                                    }
                                    {
                                        isAuthenticated &&
                                        <NavLink activeClassName="w--current" to="/logout" className="nav-link w-nav-link">Logout</NavLink>
                                    }
                                </nav>
                                {
                                    isAuthenticated && <div className='auth_username'>
                                        <div> Welcome </div>
                                        <hr /> {userEmail}
                                    </div>
                                }
                                <div className={`nav-button ${showSidenav ? 'open' : ''}`} id="nav-btn" onClick={() => setShowSidenav(!showSidenav)}>
                                    <div className="nav-button-line1"></div>
                                    <div className="nav-button-line2"></div>
                                    <div className="nav-button-line3"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <header>
                {/* <div className="open_nav" onClick={() => setShowSidenav(!showSidenav)}>
                    <FontAwesome name='bars' size='2x' />
                </div> */}

                {/* <Link to='/' className='logo'> The Book Shelf <FontAwesome className='navitem_icon' name='book' /> </Link> */}

            </header>
        </Fragment >
    )
}

export default Navbar
