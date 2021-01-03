export default function (state = {}, action) {
    switch (action.type) {
        case 'GET_BOOKS':
            // ...state ==> previous state
            return { ...state, list: action.payload }
        case 'GET_BOOK_W_REVIEWER':
            return { ...state, book: action.payload.book, reviewer: action.payload.reviewer };
        case 'CLEAR_BOOK_W_REVIEWER':
            return { ...state, book: action.payload.book, reviewer: action.payload.reviewer };
        case 'ADD_BOOK':
            return { ...state, newBook: action.payload };
        case 'EDIT_BOOK':
            return { ...state, editBook: action.payload };
        case 'UPDATE_BOOK':
            return { ...state, updatedBook: action.payload };
        case 'DELETE_BOOK':
            return { ...state, deletedBook: action.payload };
        // case 'CLEAR_BOOK':
        //     return { ...state, updatedBook: null, deletedBook: null, editBook: null };
        case 'CLEAR_STATE':
            return { ...state, newBook: null, editBook: null, updatedBook: null, deletedBook: null }
        default:
            return state;
    }
}