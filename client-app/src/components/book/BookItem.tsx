import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { IBook } from '../../app/models/book';

interface IProps {
    book: IBook
}

const BookItem: React.FC<IProps> = ({ book }) => {
    return (
        <div role="listitem" className="w-dyn-item">
            <div className="shop-item-wrapper">
                <Link to={`/book-details/${book._id}`} className='bookitem shop-item-link-wrapper w-inline-block'>
                <div style={{ backgroundImage: "url('" + (book.imageUrl ? book.imageUrl : './images/book_image_default.png') + "')" }}
                        className="shop-image tumbler-1">
                        <div className="pill-2 badge primary sale w-condition-invisible">
                            New
                        </div>
                        <div className="description">
                            <p>
                                {book.author}
                            </p>
                            <p>
                                Rate: {book.rating}
                            </p>
                            <p>
                                Published: {new Date(book.createdAt).toDateString()}
                            </p>
                            {/* <p>
                                Published By: {book.reviewer.name + ' ' + book.reviewer.lastname}
                            </p> */}
                        </div>
                    </div>
                    <div className="shop-details-wrapper">
                        <div className="shop-details-left">
                            <div className="shop-item-name">
                               {book.name}
                            </div>
                            <div className="price-wrapper">
                                $ {book.price}
                    </div>
                        </div>
                    </div>
                </Link>
                <div className="shop-button-wrapper">
                    <Link to={`/book-details/${book._id}`} className="btn w-button">Details</Link>
                </div>
            </div>
        </div>
    )
}

export default BookItem
