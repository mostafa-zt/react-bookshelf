import { DispatchAction, BookState } from "../../models/book";
import * as actionTypes from "../actions/actionTypes"

const bookReducer = (state: BookState, action: DispatchAction) => {
    switch (action.type) {
        case actionTypes.LOAD_BOOK_LIST: {
            return { ...state, books: action.payload };
        }
        case actionTypes.UNMOUNT_LOAD_BOOK_LIST: {
            return { ...state, books: action.payload };
        }
        case actionTypes.LOAD_BOOK_DETAILS: {
            return { ...state, book: action.payload };
        }
        case actionTypes.UNMOUNT_BOOK_DETAILS: {
            return { ...state, book: action.payload };
        }
        case actionTypes.USER_BOOK_LIST: {
            return { ...state, bookList: action.payload };
        }
        case actionTypes.UNMOUNT_USER_BOOK_LIST: {
            return { ...state, bookList: action.payload };
        }
        case actionTypes.BOOK_CREATION: {
            return { ...state, bookCreation: action.payload };
        }
        case actionTypes.UNMOUNT_BOOK_CREATION: {
            return { ...state, bookCreation: action.payload };
        }
        case actionTypes.GET_BOOK: {
            return { ...state, bookValues: action.payload };
        }
        case actionTypes.UNMOUNT_BOOK_VALUES: {
            return { ...state, bookValues: action.payload };
        }
        case actionTypes.BOOK_UPDATE: {
            return { ...state, bookEdited: action.payload };
        }
        case actionTypes.UNMOUNT_EDIT_FORM: {
            return { ...state, bookEdited: null };
        }
        case actionTypes.BOOK_DELETE: {
            return { ...state, bookDeleted: action.payload };
        }
        default:
            return { ...state }
    }

}

export default bookReducer;