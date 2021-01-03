import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const sidenavItem = (props) => (
    <div className=''>
        <Link onClick={props.showSidenavHandler} to={props.link} className='linkitem' >
            <FontAwesome className='navitem_icon' name={props.icon} />
            {props.children}
        </Link>
    </div>
)

export default sidenavItem;