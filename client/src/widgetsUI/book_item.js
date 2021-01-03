import React from 'react';
import { Link } from 'react-router-dom';

const bookItem = (item) => {
    var createdAt = new Date(item.createdAt);
    return (
        <Link to={`/books/${item._id}/`} className='bookitem' >
            <div className="book_header">
                <h2>{item.name}</h2>
            </div>
            <div className="book_info">
                <div className="book_bubble book_author">
                    {item.author}
                </div>
                <div className="book_bubble">
                    <span>Price: </span><div className="book_bubble_value">$ {item.price} </div>
                </div>
                <div className="book_bubble">
                    <span>Page: </span><div className="book_bubble_value"> {item.pages} </div>
                </div>
                <div className="book_bubble">
                    <span>Rate: </span><div className="book_bubble_value"> {item.rating} </div>
                </div>
                <div className="book_bubble">
                    <span>Published: </span><div className="book_bubble_value"> {createdAt.toDateString()} </div>
                </div>
            </div>
        </Link>
    );
};

export default bookItem;