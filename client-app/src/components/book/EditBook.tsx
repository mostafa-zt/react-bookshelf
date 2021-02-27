import React, { Fragment, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { BookFromValues, IBook, IBookEdited } from '../../app/models/book'
import * as action from '../../app/stores/actions/book';

interface IBookValidation {
    name: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean },
    author: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean },
    review: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
    price: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
    rating: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
    pages: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
}

interface IProps extends RouteComponentProps<IMatchParams> {
    onSubmitForm: (formData: BookFromValues) => void;
    onGetBook: (id: string) => void;
    bookValues: IBook;
    bookEdited: IBookEdited;
    unMountBookBookValues: () => void;
    unMountEditForm: () => void;
    onDeleteBook: (bookId: string) => void;
}

interface IMatchParams {
    id: string;
}

const AddBook: React.FC<IProps> = ({ onSubmitForm, onGetBook, bookValues, bookEdited, match, unMountBookBookValues, unMountEditForm, onDeleteBook, history }) => {

    const bookValidation: IBookValidation = {
        name: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: true,
            touched: false
        },
        author: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: true,
            touched: false
        },
        review: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: true,
            touched: false
        },
        price: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: true,
            touched: false
        },
        pages: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: true,
            touched: false
        },
        rating: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: true,
            touched: false
        }
    }
    const [book, setBook] = useState<BookFromValues | null>(null);
    const [bookValidate, setBookValidate] = useState(bookValidation);

    useEffect(() => {
        if (match.params.id && !book) {
            onGetBook(match.params.id);
        }
        if (bookValues) {
            setBook(new BookFromValues(bookValues));
        }
        return () => {
            unMountEditForm();
            // unMountBookBookValues();
        }
    }, [match.params.id, bookValues])


    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let isValidForm = !(Object.values(bookValidate)).some(ele => ele.isValid === false);
        if (isValidForm) {
            onSubmitForm(book!)
        }
        else {
            Object.keys(bookValidate).forEach(key => {
                const element = bookValidate[key as keyof IBookValidation];
                if (!element.isValid) {
                    element.touched = true;
                    setBookValidate({ ...bookValidate, [key]: element })
                }
            })
        }
    }

    const handleInputChanges = (event: React.SyntheticEvent) => {
        const { value, name } = event.currentTarget as HTMLInputElement;
        setBook({ ...book!, [name]: value });
        const element = bookValidate[name as keyof IBookValidation]
        let isValid = true;
        if (bookValidate[name as keyof IBookValidation].validation.required) {
            isValid = value !== '' && value !== null;
        }
        const elementValidation = { ...element, isValid: isValid, touched: true }
        setBookValidate({ ...bookValidate, [name]: elementValidation })
    }

    const deleteBook = () => {
        onDeleteBook(book?._id!);
        history.push('/user-books/');
    }

    return (
        <div className="container">
            <div className="form_box">
                {bookEdited && bookEdited.success ?
                    (
                        <Fragment>
                            <div className='user_msg show success'>
                                <div>{bookEdited.message}</div>
                                <div>
                                    <Link className="link" to={`/book-details/${bookEdited.book._id}`}>
                                        Click here to see the book information...
                                </Link>
                                </div>
                            </div>

                        </Fragment>

                    ) : bookEdited && !bookEdited.success ?
                        (
                            <div className='user_msg show danger'>{bookEdited.message}</div>
                        ) : null
                }
                <form noValidate={true} onSubmit={(event) => submitHandler(event)} className="submitform">
                    <h2>Edit Review</h2>
                    <div className="form_element">
                        <input
                            type="text"
                            className={!bookValidate.name.isValid && bookValidate.name.touched ? 'hasError' : ''}
                            name='name'
                            placeholder="Enter name"
                            value={book ? book.name : ''}
                            onChange={(event) => handleInputChanges(event)}
                        />
                        {!bookValidate.name.isValid && bookValidate.name.touched && <span className='error_msg'>Please enter name</span>}
                    </div>
                    <div className="form_element">
                        <input
                            type="text"
                            className={!bookValidate.author.isValid && bookValidate.author.touched ? 'hasError' : ''}
                            name='author'
                            placeholder="Enter author"
                            value={book ? book.author : ''}
                            onChange={(event) => handleInputChanges(event)}
                        />
                        {!bookValidate.author.isValid && bookValidate.author.touched && <span className='error_msg'>Please enter author</span>}
                    </div>
                    <div className="form_element">
                        <textarea
                            cols={6} rows={4}
                            className={!bookValidate.review.isValid && bookValidate.review.touched ? 'hasError' : ''}
                            name='review'
                            placeholder="Enter review"
                            value={book ? book.review : ''}
                            onChange={(event) => handleInputChanges(event)}
                        >
                        </textarea>
                        {!bookValidate.review.isValid && bookValidate.review.touched && <span className='error_msg'>Please enter review</span>}
                    </div>
                    <div className="form_element">
                        <input
                            type="number"
                            className={!bookValidate.pages.isValid && bookValidate.pages.touched ? 'hasError' : ''}
                            name='pages'
                            placeholder="Enter pages"
                            value={book ? book.pages : ''}
                            onChange={(event) => handleInputChanges(event)}
                        />
                        {!bookValidate.pages.isValid && bookValidate.pages.touched && <span className='error_msg'>Please enter pages</span>}
                    </div>
                    <div className="form_element">
                        <select
                            value={book ? book.rating : 1}
                            name='rating'
                            onChange={(event) => handleInputChanges(event)}>
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
                            name='price'
                            className={!bookValidate.price.isValid && bookValidate.price.touched ? 'hasError' : ''}
                            placeholder="Enter price"
                            value={book ? book.price : 0}
                            onChange={(event) => handleInputChanges(event)}
                        />
                        {!bookValidate.price.isValid && bookValidate.price.touched && <span className='error_msg'>Please enter price</span>}
                    </div>
                    <div className="form_element text-center">
                        <button type="submit">Submit</button>
                        <button onClick={deleteBook} className='button button-danger' style={{marginLeft:10}} type="button">Delete</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        bookValues: state.bookReducer.bookValues,
        bookEdited: state.bookReducer.bookEdited
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmitForm: (formData: BookFromValues) => dispatch(action.updateBook(formData)),
        onGetBook: (id: string) => dispatch(action.getBook(id)),
        unMountBookBookValues: () => dispatch(action.unMountBookBookValues()),
        unMountEditForm: () => dispatch(action.unMountEditForm()),
        onDeleteBook: (bookId: string) => dispatch(action.deleteBook(bookId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)
