import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBook } from '../../app/models/book';
import * as actions from '../../app/stores/actions/book';
import { Link } from 'react-router-dom';
import BooksLoader from './BooksLoader';

interface IProps {
    books: IBook[];
    onLoadBookList: (limit?: number, start?: number, order?: string, list?: IBook[]) => void;
    unMountBookList: () => void;
}

const LIMIT_FETCH_BOOKS = 3;

const Books: React.FC<IProps> = ({ books, onLoadBookList, unMountBookList }) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        onLoadBookList(LIMIT_FETCH_BOOKS, 0, 'desc');
        return () => {
            unMountBookList();
        }
    }, [])

    const loadmore = () => {
        setLoading(true);
        let count = books.length;
        onLoadBookList(LIMIT_FETCH_BOOKS, count, 'desc', books);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    if (!books) return (<BooksLoader />)

    return (
        <Fragment>
            <div className="page-title-section">
                <div className="container">
                    <h1 className="page-title">Book List</h1>
                </div>
            </div>
            <div className="content-section">
                <div className="container">
                    <div className="shop-page-wrapper">
                        <div className="shop-list">
                            <div className="products-list-wrapper w-dyn-list">
                                <div role="list" className="products-list w-dyn-items">
                                    {
                                        books && books.map(book => (
                                            <div role="listitem" className="w-dyn-item">
                                                <div className="shop-item-wrapper">
                                                    <Link to={`/book-details/${book._id}`} className="shop-item-link-wrapper w-inline-block">
                                                        <div style={{ backgroundImage: "url('" + book.imageUrl + "')" }}
                                                            className="shop-image tumbler-1 narrow-list">
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
                                                                    published By: Mostafa Zartaj
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
                                        ))
                                    }
                                </div>
                            </div>
                                <div style={{ textAlign: 'center' }}>
                                    <div className="loadmore" onClick={loadmore}>LoadMore...</div>
                                    {loading && <div className="lds-dual-ring"></div>}
                                </div>
                        </div>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return { books: state.bookReducer.books }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLoadBookList: (limit?: number, start?: number, order?: string, list?: IBook[]) => dispatch(actions.loadBookList(limit, start, order, list)),
        unMountBookList: () => dispatch(actions.unMountBookList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Books)
