import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';
import Sidenav from '../Sidenav/sidenav';
import Aux from '../../hoc/Auxiliary/auxiliary';

class Header extends Component {

    state = {
        showSidenav: false
    }

    showSidenavHandler = () => {
        this.setState((prevState) => {
            return { showSidenav: !prevState.showSidenav }
        })
    }

    render() {
        return (
            <Aux>
                <Sidenav showSidenavHandler={this.showSidenavHandler} showSidenav={this.state.showSidenav} />
                <header>
                    <div className="open_nav">
                        <FontAwesome name="bars" onClick={this.showSidenavHandler} />
                    </div>
                    <Link to='/' className='logo'> The Book Shelf </Link>
                </header>
            </Aux>
        );
    }
};

export default Header;