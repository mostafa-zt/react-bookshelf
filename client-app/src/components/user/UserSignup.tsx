import { motion } from 'framer-motion';
import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { IUserSignupValidation, UserSignupFromValues, IUserLoginResponse } from '../../app/models/UserSignup';
import * as actions from '../../app/stores/actions/user';


interface IProps extends RouteComponentProps<IMatchParams> {
    login: IUserLoginResponse;
    onSubmitSignup: (formData: UserSignupFromValues) => void;
    unMountSignup: () => void;
    signupError: any
}

interface IMatchParams { }

const UserSignup: React.FC<IProps> = ({ onSubmitSignup, login, history, unMountSignup, signupError }) => {
    const bookValidation: IUserSignupValidation = {
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
        },
        confirmPassword: {
            validation: {
                required: true,
            },
            isValid: false,
            touched: false
        },
        lastname: {
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        },
        name: {
            validation: {
                required: true
            },
            isValid: false,
            touched: false
        }
    };

    const [user, setUser] = useState(new UserSignupFromValues());
    const [userValidate, setUserValidate] = useState(bookValidation);

    useEffect(() => {
        if (login && login.success && login.token) {
            history.push('/');
        }
        return () => {
            unMountSignup();
        }
    }, [login])

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let isValidForm = !(Object.values(userValidate)).some(ele => ele.isValid === false);
        if (isValidForm) {
            onSubmitSignup(user)
        }
        else {
            Object.keys(userValidate).forEach(key => {
                const element = userValidate[key as keyof IUserSignupValidation];
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
        const element = userValidate[name as keyof IUserSignupValidation]
        let isValid = true;
        if (userValidate[name as keyof IUserSignupValidation]!.validation.required) {
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
                        <h1 className="page-title">Signup</h1>
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
                                    {signupError && !signupError.success ?
                                        <div className='user_msg show danger'>
                                            {signupError.messages.map((message: any, i: number) => (
                                                <div key={i}>{message.msg}</div>
                                            ))}
                                        </div> : null}
                                    <form noValidate={true} onSubmit={submitHandler} className="submitform">
                                        <label>Email</label>
                                        <input
                                            type="email"
                                            placeholder="Enter your email"
                                            name="email"
                                            className={!userValidate.email.isValid && userValidate.email.touched ? 'hasError' : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!userValidate.password.isValid && userValidate.password.touched && <span className='error_msg'>Please enter email</span>}
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your first name"
                                            name="name"
                                            className={!userValidate.name.isValid && userValidate.name.touched ? 'hasError' : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!userValidate.name.isValid && userValidate.name.touched && <span className='error_msg'>Please enter first name</span>}
                                        <label>Lastname</label>
                                        <input
                                            type="text"
                                            placeholder="Enter your last name"
                                            name="lastname"
                                            className={!userValidate.lastname.isValid && userValidate.lastname.touched ? 'hasError' : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!userValidate.lastname.isValid && userValidate.lastname.touched && <span className='error_msg'>Please enter last name</span>}
                                        <label>Password</label>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Enter your password"
                                            className={!userValidate.password.isValid && userValidate.password.touched ? 'hasError' : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!userValidate.email.isValid && userValidate.email.touched && <span className='error_msg'>Please enter password</span>}
                                        <label>Confirm Password</label>
                                        <input
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Enter your password to confirm"
                                            className={!userValidate.confirmPassword!.isValid && userValidate.confirmPassword!.touched ? 'hasError' : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!userValidate.confirmPassword!.isValid && userValidate.confirmPassword!.touched && <span className='error_msg'>Please enter password</span>}
                                        <button type="submit" className="btn w-button">Signup</button>
                                    </form>
                                    <div className='login-or-signup-box'>
                                        If you have an account,
                                    <Link className="link" to="/login/">click here to login.</Link>
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
        signupError: state.userReducer.signupError
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmitSignup: (formData: UserSignupFromValues) => dispatch(actions.signup(formData)),
        unMountSignup: () => dispatch(actions.unMountSignup())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSignup)
