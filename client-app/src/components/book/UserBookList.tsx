import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IBook } from '../../app/models/book';
import { getUserBookList } from '../../app/stores/actions/book';

interface IProps {
    onUserBookList: () => void,
    bookList: IBook[]
}

const UserBookList: React.FC<IProps> = ({ onUserBookList, bookList }) => {

    useEffect(() => {
        onUserBookList();
    }, [onUserBookList])

    if (!bookList) return (<div>Loading...</div>)

    return (
        <div className="container">
            <h4>Your Reviews</h4>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th>Date</th>
                        <th>Pages</th>
                        <th>Price</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookList.length > 0 ? bookList.map(book => {
                            // const date = new Date(book.createdAt);
                            return (
                                <tr key={book._id}>
                                    <td className="capitalize">
                                        <Link className="link" to={`/edit-book/${book._id}`}>
                                            {book.name}
                                        </Link>
                                    </td>
                                    <td className="capitalize">{book.author}</td>
                                    <td>{book.createdAt}</td>
                                    <td>{book.pages}</td>
                                    <td>{book.price}</td>
                                    <td>{book.rating}</td>
                                </tr>
                            )
                        }) : <tr><td className='empty_book_list' colSpan={6}>There is not any book saved</td></tr>
                    }
                </tbody>
            </table>

        </div>
    )
}

const mapStateToProps = (state: any) => {
    return { bookList: state.bookReducer.bookList }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onUserBookList: () => dispatch(getUserBookList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserBookList)
