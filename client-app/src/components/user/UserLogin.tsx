import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom'
import { IUserValidation, UserFromValues, IUserLoginResponse } from '../../app/models/UserLogin';
import * as actions from '../../app/stores/actions/user';


interface IProps extends RouteComponentProps<IMatchParams> {
    login: IUserLoginResponse;
    onSubmitLogin: (formData: UserFromValues) => void;
    loginError: any;
    unMoundLogin: () => void;
}

interface IMatchParams { }

const UserLogin: React.FC<IProps> = ({ onSubmitLogin, login, history, unMoundLogin, loginError }) => {
    const bookValidation: IUserValidation = {
        email: {
            validation: {
                required: true,
            },
            isValid: false,
            touched: false
        },
        password: {
            validation: {
                required: true,
            },
            isValid: false,
            touched: false
        }
    };

    const [user, setUser] = useState(new UserFromValues());
    const [userValidate, setUserValidate] = useState(bookValidation);

    useEffect(() => {
        if (login && login.success && login.token) {
            history.push('/');
        }
        return () => {
            unMoundLogin();
        }
    }, [login])

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let isValidForm = !(Object.values(userValidate)).some(ele => ele.isValid === false);
        if (isValidForm) {
            onSubmitLogin(user)
        }
        else {
            Object.keys(userValidate).forEach(key => {
                const element = userValidate[key as keyof IUserValidation];
                if (!element!.isValid) {
                    element!.touched = true;
                    setUserValidate({ ...userValidate, [key]: element })
                }
            })
        }
    }

    const handleInputChanges = (event: React.SyntheticEvent) => {
        const { value, name } = event.currentTarget as HTMLInputElement;
        setUser({ ...user, [name]: value });
        const element = userValidate[name as keyof IUserValidation]
        let isValid = true;
        if (userValidate[name as keyof IUserValidation]!.validation.required) {
            isValid = value !== '' && value !== null;
        }
        const elementValidation = { ...element, isValid: isValid, touched: true }
        setUserValidate({ ...userValidate, [name]: elementValidation })
    }

    return (
        <div className="container">
            <div className="form_box">
                {loginError && !loginError.success ?
                    <div className='user_msg show danger'>
                        {loginError.messages.map((message: any, i: number) => (
                            <div key={i}>{message.msg}</div>
                        ))}
                    </div> : null}
                <form noValidate={true} onSubmit={submitHandler} className="submitform">
                    <h2>Login</h2>
                    <div className="form_element">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            name="email"
                            // value={this.state.email}
                            className={!userValidate.email.isValid && userValidate.email.touched ? 'hasError' : ''}
                            onChange={(event) => handleInputChanges(event)}
                        />
                        {!userValidate.email.isValid && userValidate.email.touched && <span className='error_msg'>Please enter email</span>}
                    </div>
                    <div className="form_element">
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            // value={this.state.password}
                            className={!userValidate.password.isValid && userValidate.password.touched ? 'hasError' : ''}
                            onChange={(event) => handleInputChanges(event)}
                        />
                        {!userValidate.password.isValid && userValidate.password.touched && <span className='error_msg'>Please enter password</span>}
                    </div>
                    <div className="form_element text-center">
                        <button type="submit">Login</button>
                    </div>
                    <div className="form_element text-center">
                        If you don't have any account!
                        <Link className="link link_signup" to="/signup/">click here to signup.</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        login: state.userReducer.login,
        loginError: state.userReducer.loginError
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmitLogin: (formData: UserFromValues) => dispatch(actions.login(formData)),
        unMoundLogin: () => dispatch(actions.unMountLogin())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin)
