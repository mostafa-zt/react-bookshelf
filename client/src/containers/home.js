import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getBooks } from '../actions'
import BookItem from '../widgetsUI/book_item';
import Skeleton from 'react-loading-skeleton'

const LIMIT_FETCH_BOOKS = 3;
class Home extends Component {
    state = {
        loading: true
    }

    // componentWillMount() {
    //     if (this.state.loading) {
          
    //     }
    // }
    componentDidMount() {
        this.props.dispatch(getBooks(LIMIT_FETCH_BOOKS, 0, 'desc'));
        setTimeout(() => {
            this.setState({ loading: false });
        }, 1000);
    }

    

    // shouldComponentUpdate(nextProps, nextState) {
    //     return nextProps.books !== this.props.books;
    //  }

    renderItems = (books) => {
        return (books && books.list) ?
            books.list.map((item) =>
            (
                <BookItem {...item} key={item._id} />
            )
            )
            : null
    }

    loadmore = () => {
        let count = this.props.books.list.length;
        this.props.dispatch(getBooks(LIMIT_FETCH_BOOKS, count, 'desc', this.props.books.list));
    }

    render() {
        console.log(this.props);
        if (this.state.loading) {
            return (
                <div className="container">
                    <Skeleton style={{ marginTop: 10 }} height={100} count={4} />
                    <Skeleton style={{ marginTop: 5 }} height={50} count={1} />
                    {/* <Skeleton circle={true} height={50} width={50} /> */}
                </div>
            )
        }
        return (
            <div>
                {this.renderItems(this.props.books)}
                <div className="loadmore" onClick={this.loadmore}>
                    LoadMore...
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        books: state.bookReducer
    }
}
export default connect(mapStateToProps)(Home);
