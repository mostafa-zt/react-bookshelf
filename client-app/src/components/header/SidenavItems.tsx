import React, { Fragment } from 'react'
import FontAwesome from 'react-fontawesome'
import { Link } from 'react-router-dom';
import { menuItems } from './menuItems';

interface IProps {
    showSidenavHandler: (show: boolean) => void;
    isAuthenticated: boolean;
}

const SidenavItems: React.FC<IProps> = ({ showSidenavHandler, isAuthenticated }) => {
    return (
        <Fragment>
            {menuItems.map(item => {
                if (isAuthenticated && item.showInAuthenticated)
                    return (
                        <div className='navitem' key={item.text}>
                            <Link to={item.link} onClick={() => showSidenavHandler(false)} className='linkitem' >
                                <FontAwesome className='navitem_icon' name={item.icon} />
                                {item.text}
                            </Link>
                        </div>
                    )
                else if (!isAuthenticated && item.showInNotAuthenticated)
                    return (
                        <div className='navitem' key={item.text}>
                            <Link to={item.link} onClick={() => showSidenavHandler(false)} className='linkitem' >
                                <FontAwesome className='navitem_icon' name={item.icon} />
                                {item.text}
                            </Link>
                        </div>
                    )
            }
            )}
        </Fragment>
    )
}


export default SidenavItems
