import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { userSignup, clearState } from '../../actions';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { isEmpty } from '../../hoc/Auxiliary/helper';

class Signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        loading: true
    }
    componentWillMount() {
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }
    componentWillUnmount() {
        this.props.dispatch(clearState());
    }
    handleInputEmail = (event) => {
        this.setState({ email: event.target.value });
    }
    handleInputPassword = (event) => {
        this.setState({ password: event.target.value });
    }
    handleInputConfirmPassword = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }
    submitForm = (event) => {
        event.preventDefault();
        this.setState({ error: '' });
        const user = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        };
        this.props.dispatch(userSignup(user))
    }
    redirect = () => {
        setTimeout(() => {
            this.props.history.push('/login/');
        }, 2000);
    }
    render() {
        console.log("PROPS====>")
        console.log(this.props);
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
                        <h2>Register New User</h2>
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
                        <div className="form_element">
                            <input
                                type="password"
                                placeholder="Enter your password again for confirmation"
                                value={this.state.confirmPassword}
                                onChange={this.handleInputConfirmPassword}
                            />
                        </div>
                        <div className="form_element text-center">
                            <button type="submit">Signup</button>
                        </div>
                        <div className="form_element text-center">
                            If you have already signed up!
                            <Link className="link link_signup" to="/login/">click here to login.</Link>
                        </div>
                    </form>
                    {
                        this.props.signup && !isEmpty(this.props.signup) ?
                            <div className={`user_msg ${this.props.signup.success ? 'show success' : 'show danger'}`}>
                                {
                                    this.props.signup.success ?
                                        (
                                            <div>
                                                <div>Your account has been successfully saved.</div>
                                                <div>
                                                    It is redirecting to login...
                                                    {this.redirect()}
                                                </div>
                                            </div>

                                        )
                                        : <div>{this.props.signup.message}</div>
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("STATE====>")
    console.log(state);
    return { ...state.userReducer }
}

export default connect(mapStateToProps)(Signup);