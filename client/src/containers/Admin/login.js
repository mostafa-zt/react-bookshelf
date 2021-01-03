import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { loginUser, clearState } from '../../actions';
import { isEmpty } from '../../hoc/Auxiliary/helper';

class Login extends Component {

    state = {
        email: '',
        password: '',
        error: '',
        seccess: false,
        loading: true
    }
    handleInputEmail = (event) => {
        this.setState({ email: event.target.value })
    }
    handleInputPassword = (event) => {
        this.setState({ password: event.target.value })
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }
    componentWillUnmount() {
        this.props.dispatch(clearState());
    }
    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(loginUser(this.state.email, this.state.password));
    }
    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps=========>');
        console.log(nextProps);
        if (nextProps.login && nextProps.login.success) {
            setTimeout(() => {
                this.props.history.push('/');
            }, 2000);
        }
    }
    render() {
        const user = this.props.login;
        if (this.state.loading) {
            return (
                <div className="container">
                    <Skeleton style={{ marginTop: 10 }} height={350} count={1} />
                </div>
            )
        }
        return (
            <div className="container">
                <div className="form_box">
                    <form noValidate={true} onSubmit={this.submitForm} className="submitform">
                        <h2>Login</h2>
                        <div className="form_element">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={this.state.email}
                                onChange={this.handleInputEmail}
                            />
                        </div>
                        <div className="form_element">
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={this.state.password}
                                onChange={this.handleInputPassword}
                            />
                        </div>
                        <div className="form_element text-center">
                            <button type="submit">Login</button>
                        </div>
                        <div className="form_element text-center">
                            If you don't have any account!
                            <Link className="link link_signup" to="/signup/">click here to signup.</Link>
                        </div>
                        {
                            this.props.login && !isEmpty(this.props.login) ?
                                <div className={`user_msg ${this.props.login.success ? 'show success' : 'show danger'}`}>
                                    {
                                        this.props.login.success ?
                                            (
                                                <div>
                                                    <div>You Logged in successfully.</div>
                                                    <div>
                                                        It is redirecting to home page...
                                                    </div>
                                                </div>
                                            )
                                            : <div>{this.props.login.message}</div>
                                    }
                                </div>
                                : null
                        }
                    </form>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    console.log(state);
    return { ...state.userReducer }
}
export default connect(mapStateToProps)(Login);