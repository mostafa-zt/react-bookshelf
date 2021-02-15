import { getAxios } from "../../axios/axios";
import * as actionTypes from "./actionTypes";
import {  UserFromValues } from '../../models/UserLogin';
import { UserSignupFromValues } from "../../models/UserSignup";
import { AxiosResponse } from "axios";

const sleep = (duration: number) => (response: AxiosResponse) => new Promise<AxiosResponse>((resolve, reject) => { setTimeout(() => { resolve(response) }, duration); })

const loginSuccess = (respone: any) => {
    return {
        payload: respone,
        type: actionTypes.LOGIN_USER_SUCCESS
    }
}
const loginFail = (response: any) => {
    return {
        payload: response,
        type: actionTypes.LOGIN_USER_FAIL
    }
}
export const unMountLogin = () => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_LOGIN
    }
}
export const login = (data: UserFromValues) => {
    return (dispatch: any) => {
        getAxios().post('/login/', data)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                window.localStorage.setItem('jwt', response.data.token);
                window.localStorage.setItem('jwt_expirationTime', expirationDate.toString());
                window.localStorage.setItem('jwt_user_email', response.data.email);
                dispatch(loginSuccess(response.data));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(loginFail(error))
            })
    }
}

export const signup = (data: UserSignupFromValues) => {
    return (dispatch: any) => {
        getAxios().post('/signup/', data)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                window.localStorage.setItem('jwt', response.data.token);
                window.localStorage.setItem('jwt_expirationTime', expirationDate.toString());
                window.localStorage.setItem('jwt_user_email', response.data.email);
                dispatch(signupSuccess(response.data));
                dispatch(checkAuthTimeOut(response.data.expiresIn));
            })
            .catch(error => dispatch(signupFail(error)))
    }
}
const signupSuccess = (response: any) => {
    return {
        payload: response,
        type: actionTypes.SIGNUP_USER_SUCCESS
    }
}
const signupFail = (response: any) => {
    return {
        payload: response,
        type: actionTypes.SIGNUP_USER_FAIL
    }
}
export const unMountSignup = () => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_SIGNUP
    }
}

export const logout = () => {
    window.localStorage.removeItem('jwt');
    window.localStorage.removeItem('jwt_expirationTime');
    window.localStorage.removeItem('jwt_user_email');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut = (expirationTime: number) => {
    return (dispatch: any) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    }
}

export const authCheckState = () => {
    return (dispatch: any) => {
        const token = window.localStorage.getItem('jwt');
        if (!token) {
            dispatch(logout());
        } else {
            const expirationDate = new Date(window.localStorage.getItem('jwt_expirationTime')!);
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(loginSuccess({ token: token, success: true, email: window.localStorage.getItem('jwt_user_email') }));
                dispatch(checkAuthTimeOut((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    }
}

export const loadUser = () => {
    return (dispatch: any) => {
        getAxios().get('/user-profile/').then(sleep(500))
            .then(response => dispatch(loadUserSuccess(response.data)))
            .catch(error => { console.log(error) })
    }
}
const loadUserSuccess = (data: any) => {
    return {
        payload: data,
        type: actionTypes.LOAD_USER_PROFILE
    }
}
export const unMountLoadUser = () => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_LOAD_USER_PROFILE
    }
}