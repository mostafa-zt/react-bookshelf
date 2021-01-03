import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary/auxiliary';
import Backdrop from './backdrop';
import SidenavItems from './sidenavItems';

class Sidenav extends Component {
    render() {
        return (
            <Aux>
                <Backdrop showSidenav={this.props.showSidenav} showSidenavHandler={this.props.showSidenavHandler} />
                <div className={`sidenav ${this.props.showSidenav ? 'open' : ''}`}>
                    <div>
                      <SidenavItems showSidenavHandler={this.props.showSidenavHandler} />
                    </div>
                </div>
            </Aux>
        );
    };
}

export default Sidenav;