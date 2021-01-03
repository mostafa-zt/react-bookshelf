import React from 'react';

const backdrop = (props)=>{
    return (
        props.showSidenav ? <div onClick={props.showSidenavHandler} className='backdrop'></div> : null
    )
}

export default backdrop;