import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { IBook } from '../../app/models/book';
import BookItem from '../book/BookItem';
import HomeLoader from './HomeLoader';
import * as actions from '../../app/stores/actions/book';

interface IProps {
    books: IBook[];
    onLoadBookList: (limit?: number, start?: number, order?: string, list?: IBook[]) => void;
    unMountBookList: () => void;
}

const LIMIT_FETCH_BOOKS = 3;

const Home: React.FC<IProps> = ({ books, onLoadBookList, unMountBookList }) => {

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

    if (!books) return (<HomeLoader />)

    return (
        <div className="container">
            {books && books.map(book => (
                <BookItem book={book} key={book._id} />
            ))}
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <div className="loadmore" onClick={loadmore}>LoadMore...</div>
                {loading && <div className="lds-dual-ring"></div>}
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
