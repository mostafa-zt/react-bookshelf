import React from 'react';
import { Link } from 'react-router-dom';
import { IBook } from '../../app/models/book';

interface IProps {
    book: IBook
}

const BookItem: React.FC<IProps> = ({ book }) => {
    return (
        <Link to={`/book-details/${book._id}`} className='bookitem' >
            <div className="book_header">
                <h2>{book.name}</h2>
            </div>
            <div className="book_info">
                <div className="book_bubble book_author">
                    {book.author}
                </div>
                <div className="book_bubble">
                    <span>Price: </span><div className="book_bubble_value">$ {book.price} </div>
                </div>
                <div className="book_bubble">
                    <span>Page: </span><div className="book_bubble_value"> {book.pages} </div>
                </div>
                <div className="book_bubble">
                    <span>Rate: </span><div className="book_bubble_value"> {book.rating} </div>
                </div>
                <div className="book_bubble">
                    <span>Published: </span><div className="book_bubble_value"> {new Date(book.createdAt).toDateString()} </div>
                </div>
            </div>
        </Link>
    )
}

export default BookItem
