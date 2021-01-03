import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsers, userRegister , clearState} from '../../actions';
import { isEmpty } from '../../hoc/Auxiliary/helper';

class Register extends Component {
    state = {
        name: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        error: ''
    }
    componentDidMount() {
        this.props.dispatch(getUsers());
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
    handleInputName = (event) => {
        this.setState({ name: event.target.value });
    }
    handleInputLastname = (event) => {
        this.setState({ lastname: event.target.value });
    }
    submitForm = (event) => {
        event.preventDefault();
        this.setState({ error: '' });
        this.props.dispatch(userRegister({
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            name: this.state.name,
            lastname: this.state.lastname
        }, this.props.users))
    }
    showUserList = (users) => {
        return users ?
            users.map(user => (
                <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.lastname}</td>
                    <td>{user.email}</td>
                </tr>
            ))
            : null
    }
    render() {
        console.log("render PROPS ==========>>")
        console.log(this.props);
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
                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={this.state.name}
                                onChange={this.handleInputName}
                            />
                        </div>
                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter your lastname"
                                value={this.state.lastname}
                                onChange={this.handleInputLastname}
                            />
                        </div>
                        <div className="form_element text-center">
                            <button type="submit">Register</button>
                        </div>
                    </form>
                    {
                        this.props.register && !isEmpty(this.props.register) ?
                            <div className={`user_msg ${this.props.register.success ? 'show success' : 'show danger'}`}>
                                {
                                    this.props.register.success  ?
                                        (
                                            <div>
                                                <div>Your account has been successfully saved.</div>
                                            </div>

                                        )
                                        : <div>{this.props.register.message}</div>
                                }
                            </div>
                            : null
                    }
                </div>
                <div className="form_box">
                    <h2>User List</h2>
                    <table>
                        <thead>
                            <tr>
                                <td>
                                    Name
                                  </td>
                                <td>
                                    Lastname
                                  </td>
                                <td>
                                    Email
                                  </td>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showUserList(this.props.users)}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("mapStateToProps STATE=========>");
    console.log(state);
    return { ...state.userReducer } // register
}
export default connect(mapStateToProps)(Register);