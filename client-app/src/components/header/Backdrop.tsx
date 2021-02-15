import React from 'react';

interface IProps {
    showSidenavHandler: (show: boolean) => void;
    showSidenav: boolean;
}

const Backdrop: React.FC<IProps> = ({ showSidenavHandler, showSidenav }) => {
    return (
        showSidenav ? <div onClick={() => showSidenavHandler(false)} className='backdrop'></div> : null
    )
}

export default Backdrop
