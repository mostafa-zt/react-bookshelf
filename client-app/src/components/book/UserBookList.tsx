import React, { Fragment, useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IBook } from '../../app/models/book';
import * as actions from '../../app/stores/actions/book';
import UserBookListLoader from './UserBookListLoader';

interface IProps {
    onUserBookList: () => void,
    bookList: IBook[],
    unMountUserBookList: () => void,
    onDeleteBook: (bookId: string) => void
}

const UserBookList: React.FC<IProps> = ({ onUserBookList, bookList, unMountUserBookList, onDeleteBook }) => {

    useEffect(() => {
        onUserBookList();
        return () => {
            unMountUserBookList();
        }
    }, [onUserBookList])

    const removeBook = (bookId: string) => {
        onDeleteBook(bookId);
    }

    if (!bookList) return (
        <UserBookListLoader />
    )

    return (
        <Fragment>
            <div className="page-title-section">
                <div className="container flex-space-between">
                    <h1 className="page-title">My Books</h1>
                    <Link to='/add-book' className="btn">Add New Book</Link>
                </div>
            </div>
            <div className="content-section">
                <div className="container">
                    <div className="shop-page-wrapper">
                        <div className="shop-list">
                            <div className="products-list-wrapper w-dyn-list">
                                {
                                    bookList.length > 0 ?
                                        <div role="list" className="products-list w-dyn-items">
                                            {
                                                bookList.length > 0 && bookList.map(book => {
                                                    return (
                                                        <div key={book._id} role="listitem" className="w-dyn-item">
                                                            <div className="shop-item-wrapper">
                                                                <div className="shop-item-link-wrapper w-inline-block">
                                                                <div style={{ backgroundImage: "url('" + (book.imageUrl ? book.imageUrl : './images/book_image_default.png') + "')" }}
                                                                        className="shop-image tumbler-1 narrow-list">
                                                                        <div className="description">
                                                                            <p>
                                                                                {book.author}
                                                                            </p>
                                                                            <p>
                                                                                Rate: {book.rating}
                                                                            </p>
                                                                            <p>
                                                                                published: {new Date(book.createdAt).toDateString()}
                                                                            </p>
                                                                            {/* <p>
                                                                        published By: Mostafa Zartaj
                                                                    </p> */}
                                                                            <Link to={`/edit-book/${book._id}`} type="button" className="btn">
                                                                                Edit Book
                                                                                </Link>
                                                                            <button onClick={() => removeBook(book._id)} type="button" className="btn">Remove Book</button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="shop-details-wrapper">
                                                                        <div className="shop-details-left">
                                                                            <div className="shop-item-name line-limitation">
                                                                                {book.name}
                                                                            </div>
                                                                            <div className="price-wrapper">
                                                                                $ {book.price}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="shop-button-wrapper">
                                                                    <Link to={`/book-details/${book._id}`} className="btn w-button">Details</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div> : <div className='empty'>Your book list is empty!</div>

                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

const mapStateToProps = (state: any) => {
    return { bookList: state.bookReducer.bookList }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onUserBookList: () => dispatch(actions.getUserBookList()),
        unMountUserBookList: () => dispatch(actions.unMountUserBookList()),
        onDeleteBook: (bookId: string) => dispatch(actions.deleteBook(bookId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBookList)
