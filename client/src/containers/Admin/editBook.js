import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBook, updateBook, deleteBook, clearState } from '../../actions';
import { isEmpty } from '../../hoc/Auxiliary/helper';

class EditBook extends Component {

    state = {
        formdata: {
            _id: this.props.match.params.id,
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '',
            price: ''
        }
    }

    componentWillMount() {
        this.props.dispatch(getBook(this.props.match.params.id));
    }

    componentWillUnmount() {
        this.props.dispatch(clearState());
    }

    componentWillReceiveProps(nextProps) {
        const book = nextProps.editBook;
        console.log('componentWillReceiveProps=====>')
        console.log(nextProps);
        this.setState({
            formdata: {
                _id: book._id,
                name: book.name,
                author: book.author,
                review: book.review,
                pages: book.pages,
                rating: book.rating,
                price: book.price
            }
        });
    }

    // updateSelect = () => {
    //     this.setState({
    //         formdata: {
    //             rating: this.props.updatedBook.book.rating
    //         }
    //     })
    // }

    handleInput = (event, name) => {
        const newFormData = { ...this.state.formdata };
        newFormData[name] = event.target.value;
        this.setState({
            formdata: newFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        this.props.dispatch(updateBook(this.state.formdata));
    }

    deleteBook = () => {
        this.props.dispatch(deleteBook(this.props.match.params.id));
    }

    redirectPage = () => {
        setTimeout(() => {
            this.props.history.push('/user/user-reviews/');
        }, 1000);
    }
    render() {
        console.log(this.props);
        return (
            <div className="container">
                <div className="form_box">
                    <form noValidate={true} onSubmit={this.submitForm} className="submitform">
                        <h2>Add Review</h2>
                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter name"
                                value={this.state.formdata.name}
                                onChange={(event) => this.handleInput(event, 'name')}
                            />
                        </div>
                        <div className="form_element">
                            <input
                                type="text"
                                placeholder="Enter author"
                                value={this.state.formdata.author}
                                onChange={(event) => this.handleInput(event, 'author')}
                            />
                        </div>
                        <div className="form_element">
                            <textarea
                                rows="20"
                                placeholder="Enter review"
                                value={this.state.formdata.review}
                                onChange={(event) => this.handleInput(event, 'review')}
                            >
                            </textarea>
                        </div>
                        <div className="form_element">
                            <input
                                type="number"
                                placeholder="Enter pages"
                                value={this.state.formdata.pages}
                                onChange={(event) => this.handleInput(event, 'pages')}
                            />
                        </div>
                        <div className="form_element">
                            <select value={this.state.formdata.rating}
                                onChange={(event) => this.handleInput(event, 'rating')}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div className="form_element">
                            <input
                                type="number"
                                placeholder="Enter Price"
                                value={this.state.formdata.price}
                                onChange={this.handleInputPassword}
                                onChange={(event) => this.handleInput(event, 'price')}
                            />
                        </div>
                        <div className="form_element text-center">
                            <button type="submit">Edit Book</button>
                        </div>
                        <div className="form_element text-center">
                            <button onClick={this.deleteBook} type="button">Delete Book</button>
                        </div>
                    </form>
                    {
                        (this.props.updatedBook && !isEmpty(this.props.updatedBook)) || (this.props.deletedBook && !isEmpty(this.props.deletedBook)) ?
                            <div className={`user_msg ${(this.props.updatedBook && this.props.updatedBook.success) || (this.props.deletedBook && this.props.deletedBook.success) ? 'show success' : 'show danger'}`}>
                                {
                                    this.props.updatedBook && this.props.updatedBook.success ?
                                        (
                                            <div>
                                                <div>{this.props.updatedBook.message}</div>
                                                <Link className="link" to={`/books/${this.props.updatedBook.book._id}`}>
                                                    Click here to see updated book
                                                    </Link>
                                            </div>

                                        )
                                        : this.props.deletedBook && this.props.deletedBook.success ?
                                            (
                                                <div>
                                                    <div>{this.props.deletedBook.message}</div>
                                                    {this.redirectPage()}
                                                </div>
                                            )
                                            : this.props.updatedBook && !this.props.updatedBook.success ?
                                                <div> {this.props.updatedBook.message}</div>
                                                : this.props.deletedBook && !this.props.deletedBook.success ?
                                                    <div> {this.props.deletedBook.message}</div>
                                                    : null
                                }
                            </div>
                            : null
                    }
                </div>
            </div >
        )
    }
}

function mapStateToProps(state) {
    return { ...state.bookReducer } // updatedBook //editBook //deletedBook
}

export default connect(mapStateToProps)(EditBook);