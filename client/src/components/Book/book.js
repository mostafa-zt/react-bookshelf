import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBookWithReviewer, clearBookWithReviewer } from '../../actions'

class Book extends Component {

    componentDidMount() {
        this.props.dispatch(getBookWithReviewer(this.props.match.params.id))
    }

    componentWillUnmount() {
        this.props.dispatch(clearBookWithReviewer)
    }

    renderBook = (bookReviewer) => {
        const createdAt = bookReviewer.book ? new Date(bookReviewer.book.createdAt) : null;
        return bookReviewer.book ?
            (
                <div className="container">
                    <div className="box">
                        <h2 className="book_title">{bookReviewer.book.name}</h2>
                        <h3 className="book_author">{bookReviewer.book.author}</h3>
                        <div className="book_reviewer_item">
                            <span > Published At: </span><div >{createdAt.toDateString()}</div>
                        </div>
                        <div className="book_reviewer_item">
                            <span> Published By: </span><div className="reviewer">{bookReviewer.reviewer.name + ' ' + bookReviewer.reviewer.lastname}</div>
                        </div>
                        <div className="book_review">
                            <p>
                                {bookReviewer.book.review}
                            </p>
                        </div>
                        <div className="book_reviewer_item">
                            <span> Rating: </span><div>{bookReviewer.book.rating}</div>
                        </div>
                        <div className="book_reviewer_item">
                            <span> Price: </span><div>$ {parseInt(bookReviewer.book.price).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            )
            : null

    }

    render() {
        console.log(this.props);
        let bookReviewer = this.props.bookReviewer;
        return (
            <div>
                {this.renderBook(bookReviewer)}
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        bookReviewer: state.bookReducer
    }
}

export default connect(mapStateToProps)(Book);