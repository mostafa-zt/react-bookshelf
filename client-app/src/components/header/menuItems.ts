import { ISideNavItems } from "../../app/models/ISideNavItems";

export const menuItems: ISideNavItems[] = [
    {
        type: 'navItem',
        icon: 'home',
        text: 'Home',
        link: '/',
        showInAuthenticated : true,
        showInNotAuthenticated: true
    },
    {
        type: 'navItem',
        icon: 'user',
        text: 'My Profile',
        link: '/user-profile/',
        showInAuthenticated : true,
        showInNotAuthenticated: false
    },
    {
        type: 'navItem',
        icon: 'key',
        text: 'Login',
        link: '/login/',
        showInAuthenticated : false,
        showInNotAuthenticated: true
    },
    {
        type: 'navItem',
        icon: 'book',
        text: 'My Reviews',
        link: '/user-books/',
        showInAuthenticated : true,
        showInNotAuthenticated: false
    },
    {
        type: 'navItem',
        icon: 'book',
        text: 'Add Reviews',
        link: '/add-book/',
        showInAuthenticated : true,
        showInNotAuthenticated: false
    },
    {
        type: 'navItem',
        icon: 'arrow-down',
        text: 'Logout',
        link: '/logout',
        showInAuthenticated : true,
        showInNotAuthenticated: false
    }
];