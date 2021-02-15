import * as actionTypes from '../../stores/actions/actionTypes';

const userReducer = (state: any, action: any) => {
    switch (action.type) {
        case actionTypes.LOGIN_USER_SUCCESS: {
            return { ...state, login: action.payload }
        }
        case actionTypes.LOGIN_USER_FAIL: {
            return { ...state, loginError: action.payload }
        }
        case actionTypes.UNMOUNT_LOGIN: {
            return { ...state, loginError: null }
        }
        case actionTypes.SIGNUP_USER_SUCCESS: {
            return { ...state, login: action.payload }
        }
        case actionTypes.SIGNUP_USER_FAIL: {
            return { ...state, signupError: action.payload }
        }
        case actionTypes.UNMOUNT_SIGNUP: {
            return { ...state, signupError: action.payload }
        }
        case actionTypes.AUTH_LOGOUT: {
            return { ...state, login: null }
        }
        case actionTypes.LOAD_USER_PROFILE: {
            return { ...state, user: action.payload }
        }
        case actionTypes.UNMOUNT_LOAD_USER_PROFILE: {
            return { ...state, user: action.payload }
        }
        default:
            return { ...state }
    }
}

export default userReducer;