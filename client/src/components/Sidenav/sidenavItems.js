import React, { Component } from 'react';
import SidenavItem from './sidenavItem';
import { connect } from 'react-redux';

class SidenavItems extends Component {
    items = [
        {
            type: 'navItem',
            icon: 'home',
            text: 'Home',
            link: '/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'user',
            text: 'My Profile',
            link: '/user/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'book-reader',
            text: 'Add Admins',
            link: '/user/register/',
            restricted: false
        },
        {
            type: 'navItem',
            icon: 'key',
            text: 'Login',
            link: '/login/',
            userLoggedin: false
        },
        {
            type: 'navItem',
            icon: 'book-reader',
            text: 'My Reviews',
            link: '/user/user-reviews/',
            userLoggedin: true
        },
        {
            type: 'navItem',
            icon: 'book-open',
            text: 'Add Reviews',
            link: '/user/add/',
            userLoggedin: true
        },
        {
            type: 'navItem',
            icon: 'arrow-down',
            text: 'Logout',
            link: '/logout',
            userLoggedin: false,
        }
    ];

    showSidenavItems = () => {
        let element;
        console.log(this.props);
        element = this.items.map((item, i) => {
            let navItemElement = null;
            if ((!this.props.auth || !this.props.auth.isAuth) && item.text !== 'Logout') {
                navItemElement = (<div className='navitem' key={item.text + i}>
                    <SidenavItem showSidenavHandler={this.props.showSidenavHandler} icon={item.icon} link={item.link}>{item.text}</SidenavItem>
                </div>)
            }
            else if (this.props.auth && this.props.auth.isAuth && item.text !== 'Login') {
                navItemElement = (<div className='navitem' key={item.text + i}>
                    <SidenavItem showSidenavHandler={this.props.showSidenavHandler} icon={item.icon} link={item.link}>{item.text}</SidenavItem>
                </div>)
            }
            return navItemElement;
        })


        return element;
    }

    render() {
        return (
            this.showSidenavItems()
        )
    }
}

function mapStateToProps(state) {
    return { ...state.userReducer }
}


export default connect(mapStateToProps)(SidenavItems);