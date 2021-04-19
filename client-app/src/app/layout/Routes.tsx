import { AnimatePresence } from 'framer-motion'
import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, Switch, useLocation } from 'react-router'
import AddBook from '../../components/book/AddBook'
import BookDetails from '../../components/book/BookDetails'
import EditBook from '../../components/book/EditBook'
import UserBookList from '../../components/book/UserBookList'
import Books from '../../components/books/Books'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/header/Navbar'
import Home from '../../components/home/Home'
import UserLogin from '../../components/user/UserLogin'
import UserLogout from '../../components/user/UserLogout'
import UserProfile from '../../components/user/UserProfile'
import UserSignup from '../../components/user/UserSignup';
import * as actions from '../stores/actions/user';

interface IProps {
    onTryAutoSignIn: () => void;
    isAuthenticated: boolean;
    userEmail: string
}

const Routes: React.FC<IProps> = ({ onTryAutoSignIn, isAuthenticated, userEmail }) => {

    useEffect(() => {
        onTryAutoSignIn();
    }, [])

    const location = useLocation();

    let routes = null;
    if (isAuthenticated) {
        routes = (
            <AnimatePresence exitBeforeEnter>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/books' component={Books}></Route>
                    <Route path='/book-details/:id' component={BookDetails}></Route>
                    <Route path='/user-books/' component={UserBookList}></Route>
                    <Route path='/user-profile/' component={UserProfile}></Route>
                    <Route path='/add-book/' component={AddBook}></Route>
                    <Route path='/edit-book/:id' component={EditBook}></Route>
                    <Route path='/logout/' component={UserLogout}></Route>
                    <Redirect to='/' />
                </Switch>
            </AnimatePresence>
        )
    }
    else {
        routes = (
            <AnimatePresence exitBeforeEnter>
                <Switch>
                    <Route exact path='/' component={Home}></Route>
                    <Route path='/books' component={Books}></Route>
                    <Route path='/book-details/:id' component={BookDetails}></Route>
                    <Route path='/login/' component={UserLogin}></Route>
                    <Route path='/signup/' component={UserSignup}></Route>
                    <Redirect to='/' />
                </Switch>
            </AnimatePresence>
        )
    }

    return (
        <Fragment>
            <Navbar isAuthenticated={isAuthenticated} userEmail={userEmail} />
            {routes}
            <Footer />
        </Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return {
        isAuthenticated: state.userReducer.login && state.userReducer.login.success && state.userReducer.login.token !== null,
        userEmail: state.userReducer.login && state.userReducer.login.success ? state.userReducer.login.email : null
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onTryAutoSignIn: () => dispatch(actions.authCheckState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routes)
