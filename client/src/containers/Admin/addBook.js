import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { addBook, clearState } from '../../actions';
import { isEmpty } from '../../hoc/Auxiliary/helper';

class AddBook extends Component {

    state = {
        formdata: {
            name: '',
            author: '',
            review: '',
            pages: '',
            rating: '1',
            price: ''
        }
    }
    componentWillUnmount(){
        this.props.dispatch(clearState());
    }

    handleInput = (event, name) => {
        const newFormData = { ...this.state.formdata };
        newFormData[name] = event.target.value;
        this.setState({
            formdata: newFormData
        })
    }

    submitForm = (event) => {
        event.preventDefault();
        console.log(this.state.formdata);
        this.props.dispatch(addBook({
            ...this.state.formdata,
            ownerId: this.props.auth.id
        }));
    }

    showNewBook = (bookId) => (
        <Link className="link" to={`/books/${bookId}`}>
            Click here to see the book information...
        </Link>

    )

    render() {
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
                            <button type="submit">Submit</button>
                        </div>
                    </form>
                    {
                        this.props.newBook && !isEmpty(this.props.newBook) ?
                            <div className={`user_msg ${this.props.newBook.success ? 'show success' : 'show danger'}`}>
                                {
                                    this.props.newBook.success ?
                                        (
                                            <div>
                                                <div>{this.props.newBook.message}</div>
                                                <div>
                                                    {this.showNewBook(this.props.newBook.bookId)}
                                                </div>
                                            </div>

                                        )
                                        : <div>{this.props.newBook.message}</div>
                                }
                            </div>
                            : null
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state);
    return { ...state.bookReducer }// newBook
}

export default connect(mapStateToProps)(AddBook);