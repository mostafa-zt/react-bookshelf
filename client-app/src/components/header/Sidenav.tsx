import React, { Fragment } from 'react';
import Backdrop from './Backdrop';
import SidenavItems from './SidenavItems';

interface IProps {
    showSidenav: boolean;
    setShowSidenavHnadler: (val: boolean) => void;
    isAuthenticated: boolean;
}

const Sidenav: React.FC<IProps> = ({ showSidenav, setShowSidenavHnadler ,isAuthenticated }) => {
    return (
        <Fragment>
            <Backdrop showSidenav={showSidenav} showSidenavHandler={setShowSidenavHnadler} />
            <div className={`sidenav ${showSidenav ? 'open' : ''}`}>
                <div>
                    <SidenavItems isAuthenticated={isAuthenticated} showSidenavHandler={setShowSidenavHnadler} />
                </div>
            </div>
        </Fragment>
    )
}

export default Sidenav
