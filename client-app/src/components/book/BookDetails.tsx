import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { IBook } from '../../app/models/book';
import { loadBookDetails, unMountBookDetails } from '../../app/stores/actions/book';
import BookDetailsLoader from './BookDetailsLoader';

interface IProps extends RouteComponentProps<IMatchParams> {
    onLoadBookDetails: (bookId: string) => void;
    book: IBook;
    unMountBookDetails: () => void;
}

interface IMatchParams {
    id: string
}

const BookDetails: React.FC<IProps> = ({ match, onLoadBookDetails, book, unMountBookDetails }) => {

    useEffect(() => {
        onLoadBookDetails(match.params.id)
        return () => { unMountBookDetails(); }
    }, [onLoadBookDetails, match])

    if (!book) return (<BookDetailsLoader />)

    return (
        <Fragment>
            <div className="page-title-section">
                <div className="container">
                    <h1 className="page-title">
                        {book.name}
                    </h1>
                </div>
            </div>
            <div className="content-section">
                <div className="container">
                    <div className="shopping-page-wrapper">
                        <div className="shopping-page-left">
                            <div style={{ backgroundImage: "url('" + book.imageUrl + "')" }}
                                className="shopping-page-image">
                            </div>
                        </div>
                        <div className="shipping-page-right">
                            <h2 className="page-product-headin">
                                {book.name}
                            </h2>
                            <div className="w-richtext">
                                <h2>What’s this book about?</h2>
                                <h3>{book.author}</h3>
                                <p>
                                    {book.review}
                                </p>
                                <div className="book-details">
                                    <span>Published At: {new Date(book.createdAt).toDateString()}</span>
                                    <span>Published By: {book.reviewer.name + ' ' + book.reviewer.lastname}</span>
                                    <span>Rating: {book.rating}</span>
                                    <span>Price: $ {book.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

const mapStateToProps = (state: any) => {
    return { book: state.bookReducer.book }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onLoadBookDetails: (bookdId: string) => dispatch(loadBookDetails(bookdId)),
        unMountBookDetails: () => dispatch(unMountBookDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails)
