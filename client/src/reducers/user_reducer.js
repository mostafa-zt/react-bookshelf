export default function (state = {}, action) {
    switch (action.type) {
        case 'USER_LOGIN':
            return { ...state, login: action.payload }
        case 'USER_AUTH':
            return { ...state, auth: action.payload }
        case 'GET_USER_POSTS':
            return { ...state, userPosts: action.payload }
        case 'GET_USERS':
            return { ...state, users: action.payload }
        case 'USER_REGISTER':
            return { ...state, register: { success: action.payload.success, message: action.payload.message }, users: action.payload.users, }
        case 'USER_SIGNUP':
            return { ...state, signup: action.payload }
        // case 'CLEAR_STATE_LoginSignup':
        //     return { ...state, login: null, signup: null }
        case 'CLEAR_STATE':
            return { ...state, login: null, signup: null, register: null }
        default:
            return state;
    }
}