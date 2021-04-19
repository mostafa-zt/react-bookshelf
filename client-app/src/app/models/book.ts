export interface IBook {
    _id: string;
    author: string;
    createdAt: Date;
    name: string;
    ownerId: string;
    pages: number;
    price: number;
    rating: number;
    review: string;
    updatedAt: Date;
    reviewer: IReviewer;
    imageUrl: string;
    image: ArrayBuffer | null;
}

export interface IBookFromValues extends Partial<IBook> {
}

export class BookFromValues implements IBookFromValues {
    constructor(init?: IBook) {
        Object.assign(this, init);
    }
    _id?: string = undefined;
    author: string = '';
    createdAt = undefined;
    name: string = '';
    ownerId: string = '';
    pages: number = 0;
    price: number = 0;
    rating: number = 1;
    review: string = '';
    imageUrl: string = '';
    image: ArrayBuffer | null = null;
}

export interface IReviewer {
    name: string;
    lastname: string;
}

export type BookState = {
    books: IBook[];
    bookList : IBook[];
}

export type DispatchAction = {
    type: string
    payload: object | null
}

export type DispatchType = (args: DispatchAction) => DispatchAction

export interface IResponseData {
    success: boolean;
    message: string;
    bookId: string
}

export interface IBookEdited {
    success: boolean;
    message: string;
    book: IBook;
}