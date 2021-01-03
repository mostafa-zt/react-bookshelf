import React from 'react';
import { Switch, Route } from 'react-router-dom'

import Home from './components/Home/home';
import Book from './components/Book/book';
import Layout from './hoc/Layout/layout';
import Login from './containers/Admin/login';
import Auth from './hoc/Auth/auth';
import UserProfile from './components/Admin/userProfile';
import AddBook from './containers/Admin/addBook';
import EditBook from './containers/Admin/editBook';
import UserBook from './components/Admin/userBook';
import Register from './containers/Admin/register';
import Logout from './components/Admin/logout';
import Signup from './containers/Admin/signup';


const Routes = () => {
    return (
        <Layout>
            {/* inside Switch only and only one route runs per request */}
            <Switch>
                <Route path="/" exact component={Auth(Home, true)} />
                <Route path="/login/" exact component={Login} />
                <Route path="/signup/" exact component={Signup} />
                <Route path="/user/" exact component={Auth(UserProfile, true)} />
                <Route path="/logout/" exact component={Auth(Logout, true)} />
                <Route path="/user/add/" exact component={Auth(AddBook, true)} />
                <Route path="/user/register/" exact component={Auth(Register)} />
                <Route path="/user/edit-post/:id" exact component={Auth(EditBook, true)} />
                <Route path="/books/:id/" exact component={Auth(Book)} />
                <Route path="/user/user-reviews/" exact component={Auth(UserBook, true)} />
            </Switch>
        </Layout>
    )
}

export default Routes;