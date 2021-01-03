import axios from 'axios';

export function getBooks(limit = 10, start = 0, order = 'asc', list = '') {
    const request = axios.get(`/api/books?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            } else {
                return response.data;
            }
        });
    return {
        type: 'GET_BOOKS',
        payload: request
    }
}
export function getBookWithReviewer(id) {
    const request = axios.get(`/api/getBook?id=${id}`)
    return (dispatch) => {
        request.then(({ data }) => {
            let book = data;
            axios.get(`/api/getReviewer?id=${book.ownerId}`)
                .then(({ data }) => {
                    let response = {
                        book,
                        reviewer: data
                    }
                    dispatch({
                        type: 'GET_BOOK_W_REVIEWER',
                        payload: response
                    })
                });
        })
    }
}
export function clearBookWithReviewer() {
    return {
        type: 'CLEAR_BOOK_W_REVIEWER',
        payload: {
            book: null,
            reviewer: null
        }
    }
}
export function loginUser(email, password) {
    const request = axios.post('/api/login/', { email, password })
        .then(response => response.data);
    return {
        type: 'USER_LOGIN',
        payload: request
    }
}
export function auth() {
    const request = axios.get('/api/auth')
        .then(response => response.data);
    return {
        type: 'USER_AUTH',
        payload: request
    }
}
export function addBook(book) {
    const request = axios.post('/api/book/', book)
        .then(response => response.data);
    return {
        type: 'ADD_BOOK',
        payload: request
    };
}
export function getBook(bookId) {
    const request = axios.get(`/api/getBook/?id=${bookId}`)
        .then(response => response.data);
    return {
        type: 'EDIT_BOOK',
        payload: request
    };
}
export function updateBook(book) {
    const request = axios.post('/api/bookUpdate', book)
        .then(response => response.data);
    return {
        type: 'UPDATE_BOOK',
        payload: request
    };
}
export function deleteBook(bookId) {
    const request = axios.delete(`/api/deleteBook/?id=${bookId}`)
        .then(response => response.data);
    return {
        type: 'DELETE_BOOK',
        payload: request
    };
}
export function getUserPosts(userId) {
    const request = axios.get(`/api/getUserPosts/?user=${userId}`)
        .then(response => response.data)
    return {
        type: 'GET_USER_POSTS',
        payload: request
    };
}
export function clearBook() {
    return {
        type: 'CLEAR_BOOK',
        payload: {}
    }
}
export function getUsers() {
    const request = axios.get('/api/users/')
        .then(response => response.data);
    return {
        type: 'GET_USERS',
        payload: request
    };
}
export function userRegister(user, userList) {
    const request = axios.post('/api/register', user)
    return (dispatch) => {
        request.then(({ data }) => {
            let users = data.success ? [...userList, data.user] : userList
            let response = {
                success: data.success,
                message: data.message,
                users: users
            }
            dispatch({
                type: 'USER_REGISTER',
                payload: response
            });
        });
    }
}
export function userSignup(user) {
    console.log(`user obj ===> ${JSON.stringify(user)}`);
    const request = axios.post('/api/register', user)
        .then(response => {
            return response.data
        });
    console.log(request);
    return {
        type: "USER_SIGNUP",
        payload: request
    };
}


// export function clearLoginSignup() {
//     return {
//         type: "CLEAR_STATE_LoginSignup",
//         payload: {}
//     }
// }
export function clearState() {
    return {
        type: "CLEAR_STATE",
        payload: {}
    }
}