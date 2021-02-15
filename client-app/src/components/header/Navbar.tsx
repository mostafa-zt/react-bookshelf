import React, { Fragment, useState } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom'
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
            <header>
                <div className="open_nav" onClick={() => setShowSidenav(!showSidenav)}>
                    <FontAwesome name='bars' size='2x' />
                </div>
                <Link to='/' className='logo'> The Book Shelf <FontAwesome className='navitem_icon' name='book' /> </Link>
                {isAuthenticated && <div className='auth_username'>
                    <div> Welcome </div>
                    <hr /> {userEmail}
                </div>
                }
            </header>
        </Fragment >
    )
}

export default Navbar
