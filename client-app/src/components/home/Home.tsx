import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBook } from '../../app/models/book';
import BookItem from '../book/BookItem';
import HomeLoader from './HomeLoader';
import * as actions from '../../app/stores/actions/book';
import { Link } from 'react-router-dom';

interface IProps {
    newBooks: IBook[];
    loadNewBookList: () => void;
    // unMountBookList: () => void;
}

const LIMIT_FETCH_BOOKS = 3;

const Home: React.FC<IProps> = ({ newBooks, loadNewBookList }) => {

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadNewBookList();
        // return () => {
        //     unMountBookList();
        // }
    }, [])

    // const loadmore = () => {
    //     setLoading(true);
    //     let count = books.length;
    //     loadNewBookList();
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 1000);
    // }

    if (!newBooks) return (<HomeLoader />)

    return (
        // <div className="container">
        //     {books && books.map(book => (
        //         <BookItem book={book} key={book._id} />
        //     ))}
        //     <div style={{ textAlign: 'center', marginBottom: 20 }}>
        //         <div className="loadmore" onClick={loadmore}>LoadMore...</div>
        //         {loading && <div className="lds-dual-ring"></div>}
        //     </div>
        // </div>

        <Fragment>
            <div className="hero-section">
                <div className="container">
                    <div className="hero-wrapper">
                        <h1 className="hero-heading"><br />Bookshelf</h1>
                        <p className="hero-paragraph">
                            Looking for a great summer read? Want to read more on a topic you’re interested in or see what’s new
                            or trending in the book world?
                            Find and share your favorite Book, Read easily every book you are interested in!
                        </p>
                        <div className="hero-button-wrapper">
                            <Link to="/books" className="btn light outline w-button">
                                Explore All Books
                            </Link>
                        </div>
                    </div>
                    <div className="book-texture"></div>
                </div>
            </div>
            <div className="products-section">
                <div className="container">
                    <div className="shop-top-wrapper">
                        <div className="support-top-left">
                            <h2 className="support-top-heading">New Books</h2>
                        </div>
                        <div className="support-top-right"></div>
                    </div>
                    <div className="products-list-wrapper w-dyn-list">
                        <div role="list" className="products-list w-dyn-items">
                            {
                                newBooks && newBooks.map(book => (
                                    <BookItem book={book} key={book._id} />
                                ))
                            }
                        </div>
                    </div>
                    <div className="shop-more">
                        <Link to="/books" className="btn dark w-button">View All Books</Link>
                    </div>
                </div>
            </div>
            <div className="safe-section">
                <div className="container">
                    <div className="safe-wrapper">
                        <h2 className="safe-heading">
                            Read Book, Whatever you are interested.
                                </h2>
                        <p className="safe-paragraph">
                            Discover Your Community
                            Explore the diverse range of voices and perspectives
                            from your community and across the country.
                                </p>
                    </div>
                </div>
                <div className="book-texture"></div>
            </div>
            <div className="shop-local-section">
                <div className="container shop-local-container">
                    <div className="shop-local-wrapper">
                        <div className="shop-local-left"></div>
                        <div className="shop-local-right">
                            <div className="shop-local-content-wrapper">
                                <h2 className="shop-local-heading">Read Book, Whatever you are interested.</h2>
                                <p>
                                    Discover Your Community
                                    Explore the diverse range of voices and perspectives
                                    from your community and across the country.
                                        </p>
                                <p>-------</p>
                                <div><strong>Bookshelf</strong></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

const mapStateToProps = (state: any) => {
    return { newBooks: state.bookReducer.newBooks }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        loadNewBookList: () => dispatch(actions.loadNewBookList()),
        // unMountBookList: () => dispatch(actions.unMountBookList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
