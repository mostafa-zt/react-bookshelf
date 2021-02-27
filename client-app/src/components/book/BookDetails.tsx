import React, { useEffect } from 'react';
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
        <div className="container">
            <div className="box">
                <h2 className="book_title">{book.name}</h2>
                <h3 className="book_author">{book.author}</h3>
                <div className="book_reviewer_item">
                    <span > Published At: </span><div >{new Date(book.createdAt).toDateString()}</div>
                </div>
                <div className="book_reviewer_item">
                    <span> Published By: </span><div className="reviewer">{book.reviewer.name + ' ' + book.reviewer.lastname}</div>
                </div>
                <div className="book_review">
                    <p>
                        {book.review}
                    </p>
                </div>
                <div className="book_reviewer_item">
                    <span> Rating: </span><div>{book.rating}</div>
                </div>
                <div className="book_reviewer_item">
                    <span> Price: </span><div>$ {book.price}</div>
                </div>
            </div>
        </div>
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
