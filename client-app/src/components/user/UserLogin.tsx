import { motion } from 'framer-motion';
import React, { Fragment, useEffect, useState } from 'react'
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

    const pageVariants = {
        initial: {
            opacity: 0,
            y: "-100%",
            scale: 0.8
        },
        in: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        out: {
            opacity: 0,
            y: "100%",
            scale: 1.2
        }
    }

    const pageTransition = {
        transition: "linear",
        duration: 0.4
        // type:"tween",
        // ease:"anticipate",
        // duration:3
    }

    return (
        <motion.div exit="out" animate="in" initial="initial" variants={pageVariants} transition={pageTransition}>
            <Fragment>
                <div className="page-title-section">
                    <div className="container">
                        <h1 className="page-title">Login</h1>
                    </div>
                </div>
                <div id="login" className="content-section">
                    <div className="container">
                        <div className="form-wrapper">
                            <div className="form-side">
                                <h2>Login to <b>Bookshelf</b></h2>
                            </div>
                            <div className="form-main">
                                <div className="w-form">
                                    {loginError && !loginError.success ?
                                        <div className='user_msg show danger'>
                                            {loginError.messages.map((message: any, i: number) => (
                                                <div key={i}>{message.msg}</div>
                                            ))}
                                        </div> : null}
                                    <form noValidate={true} onSubmit={submitHandler} className="submitform">
                                        <label>Email</label>
                                        <input type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            // value={this.state.email}
                                            className={!userValidate.email.isValid && userValidate.email.touched ? 'input w-input hasError' : 'input w-input'}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!userValidate.email.isValid && userValidate.email.touched && <span className='error_msg'>Please enter email</span>}
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            // value={this.state.password}
                                            className={!userValidate.password.isValid && userValidate.password.touched ? 'input w-input hasError' : 'input w-input'}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!userValidate.password.isValid && userValidate.password.touched && <span className='error_msg'>Please enter password</span>}
                                        <button type="submit" className="btn w-button">Login</button>
                                    </form>
                                    <div className='login-or-signup-box'>
                                        If you don't have any account!
                                <Link className="link" to="/signup/">click here to signup.</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </motion.div>
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
