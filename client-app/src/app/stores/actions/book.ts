import { AxiosResponse } from "axios";
import { getAxios } from "../../axios/axios";
import { BookFromValues, DispatchAction, DispatchType, IBook, IBookEdited, IResponseData } from "../../models/book";
import * as actionTypes from "./actionTypes";

const sleep = (duration: number) => (response: AxiosResponse) => new Promise<AxiosResponse>((resolve, reject) => { setTimeout(() => { resolve(response) }, duration); })

const loadBookListSuccess = (data: IBook[]): DispatchAction => {
    return {
        payload: data,
        type: actionTypes.LOAD_BOOK_LIST
    }
}
export const unMountBookList = (): DispatchAction => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_LOAD_BOOK_LIST
    }
}
const loadBookListFaild = (error: any): DispatchAction => {
    return {
        payload: [],
        type: actionTypes.LOAD_BOOK_LIST
    }
}
export const loadBookList = (limit = 10, start = 0, order = 'asc', list: IBook[] = []) => {
    return (dispatch: DispatchType) => {
        getAxios().get(`/books/?limit=${limit}&skip=${start}&order=${order}`).then(sleep(500))
            .then(response => {
                if (list.length > 0) {
                    dispatch(loadBookListSuccess([...list, ...response.data]));
                }
                else {
                    dispatch(loadBookListSuccess(response.data));
                }
            })
            .catch(error => {
                dispatch(loadBookListFaild(error))
            });
    }
}

const loadBookDetailsSuccess = (data: IBook): DispatchAction => {
    return {
        payload: data,
        type: actionTypes.LOAD_BOOK_DETAILS
    }
}

export const loadBookDetails = (bookId: string) => {
    let book: any;
    return (dispatch: DispatchType) => {
        getAxios().get(`/getBook/?id=${bookId}`).then(sleep(500))
            .then(response => {
                book = response.data
                return response.data
            })
            .then(book => {
                getAxios().get(`/getReviewer?id=${book.ownerId}`)
                    .then(response => {
                        dispatch(loadBookDetailsSuccess({ ...book, reviewer: response.data }))
                    })
            })
            .catch(error => { console.log(error) })
    }
}

export const unMountBookDetails = (): DispatchAction => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_BOOK_DETAILS
    }
}

const getUserBookListSuccess = (data: IBook[]): DispatchAction => {
    return {
        payload: data,
        type: actionTypes.USER_BOOK_LIST
    }
}

export const getUserBookList = () => {
    return (dispatch: DispatchType) => {
        getAxios().get(`/getUserPosts/`)
            .then(response => dispatch(getUserBookListSuccess(response.data)))
            .catch(error => { })
    }
}

const createBookSucccss = (data: IResponseData): DispatchAction => {
    return {
        payload: data,
        type: actionTypes.BOOK_CREATION
    }
}
export const createBook = (book: BookFromValues) => {
    return (dispatch: DispatchType) => {
        getAxios().post('/book/', book)
            .then(response => {
                dispatch(createBookSucccss(response.data));
            })
            .catch(error => { })
    }
}
export const unMountCreateBook = (): DispatchAction => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_BOOK_CREATION
    }
}

export const getBook = (id: string) => {
    return (dispatch: any) => {
        getAxios().get(`/getBook/?id=${id}`)
            .then(response => dispatch(getBookSuccess(response.data)))
    }
}
const getBookSuccess = (data: IBook): DispatchAction => {
    return {
        payload: data,
        type: actionTypes.GET_BOOK
    }
}

export const updateBook = (data: BookFromValues) => {
    return (dispatch: DispatchType) => {
        getAxios().post('/bookUpdate/', data)
            .then(response => dispatch(updateBookSuccess(response.data)));
    }
}
const updateBookSuccess = (data: IBookEdited): DispatchAction => {
    return {
        payload: data,
        type: actionTypes.BOOK_UPDATE
    }
}

export const unMountBookBookValues = () => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_BOOK_VALUES
    }
}
export const unMountEditForm = () => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_EDIT_FORM
    }
}

export const deleteBook = (bookId: string) => {
    return (dispatch: DispatchType) => {
        getAxios().delete(`deleteBook/?id=${bookId}`)
            .then(response => { dispatch(deleteBookSuccess(response.data)) })
            .catch(err => { })
    }
}

const deleteBookSuccess = (data: IResponseData) => {
    return {
        payload: data,
        type: actionTypes.BOOK_DELETE
    }
}

export const unMountUserBookList = () => {
    return {
        payload: null,
        type: actionTypes.UNMOUNT_BOOK_CREATION
    }
}