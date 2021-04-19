import { motion } from 'framer-motion';
import React, { Fragment, useEffect, useRef, useState } from 'react'
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
    onSubmitForm: (formData: FormData) => void;
    onGetBook: (id: string) => void;
    bookValues: IBook;
    bookEdited: IBookEdited;
    unMountBookBookValues: () => void;
    unMountEditForm: () => void;
    onDeleteBook: (bookId: string) => void;
    bookDeleted: any
}

interface IMatchParams {
    id: string;
}

const AddBook: React.FC<IProps> = ({ onSubmitForm, onGetBook, bookValues, bookEdited, match, unMountBookBookValues, unMountEditForm, onDeleteBook, history, bookDeleted }) => {

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

    const fileInputRef = useRef(null);
    const [book, setBook] = useState<BookFromValues | null>(null);
    const [bookValidate, setBookValidate] = useState(bookValidation);
    const [imagePreview, setImagePreview] = useState<string>("");

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
            let formData = new FormData();
            formData.append('_id', book!._id as string);
            formData.append('author', book!.author);
            formData.append('name', book!.name);
            formData.append('ownerId', book!.ownerId);
            formData.append('pages', book!.pages as any);
            formData.append('price', book!.price as any);
            formData.append('rating', book!.rating as any);
            formData.append('review', book!.review);
            // formData.append('image', book!.image as any, book!.name)
            if (book!.image) {
                formData.append("image", book!.image as any, book!.name);
            }
            // else {
            //     formData.append("imageUrl", book!.image as any);
            // }
            onSubmitForm(formData)
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

    // const deleteBook = () => {
    //     onDeleteBook(book?._id!);
    //     if (bookDeleted && bookDeleted.success)
    //         history.push('/user-books/');
    // }

    const onImagePickedChanged = (event: React.SyntheticEvent) => {
        const { files, name } = event.currentTarget as HTMLInputElement;
        if ((event.target as HTMLInputElement).files![0]) {
            const file = (event.target as HTMLInputElement).files![0];
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                setBook({ ...book!, [name]: files![0] });
            }
            reader.readAsDataURL(file);
        }
    }

    const filePickerClick = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const filePicker = (fileInputRef as any).current.click();
    }

    const redirect = () => {
        setTimeout(() => {
            history.push('/user-books');
        }, 2000);
    }

    const pageVariants = {
        initial: {
            opacity: 0,
            y: "-100%",
            scale: 0.8
        },
        in: {
            opacity: 1,
            y: 0,
            scale: 1
        },
        out: {
            opacity: 0,
            y: "100%",
            scale: 1.2
        }
    }

    const pageTransition = {
        transition: "linear",
        duration: 0.4
        // type:"tween",
        // ease:"anticipate",
        // duration:3
    }

    return (
        <motion.div exit="out" animate="in" initial="initial" variants={pageVariants} transition={pageTransition}>
            <Fragment>
                <div className="page-title-section">
                    <div className="container">
                        <h1 className="page-title">
                            {book?.name}
                        </h1>
                    </div>
                </div>

                <div className="content-section">
                    <div className="container">
                        <div className="form-wrapper">
                            <div className="form-side">
                                <h2>Add a New Book</h2>
                            </div>
                            <div className="form-main">
                                <div className="w-form">
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
                                                {redirect()}
                                            </Fragment>

                                        ) : bookEdited && !bookEdited.success ?
                                            (
                                                <div className='user_msg show danger'>{bookEdited.message}</div>
                                            ) : null
                                    }
                                    <form noValidate={true} onSubmit={(event) => submitHandler(event)} className="submitform">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className={!bookValidate.name.isValid && bookValidate.name.touched ? 'hasError' : ''}
                                            name='name'
                                            placeholder="Enter name"
                                            value={book ? book.name : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.name.isValid && bookValidate.name.touched && <span className='error_msg'>Please enter name</span>}

                                        <label>Author</label>
                                        <input
                                            type="text"
                                            className={!bookValidate.author.isValid && bookValidate.author.touched ? 'hasError' : ''}
                                            name='author'
                                            placeholder="Enter author"
                                            value={book ? book.author : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.author.isValid && bookValidate.author.touched && <span className='error_msg'>Please enter author</span>}

                                        <label>Review</label>
                                        <textarea
                                            cols={6} rows={10}
                                            className={!bookValidate.review.isValid && bookValidate.review.touched ? 'hasError' : ''}
                                            name='review'
                                            placeholder="Enter review"
                                            value={book ? book.review : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        >
                                        </textarea>
                                        {!bookValidate.review.isValid && bookValidate.review.touched && <span className='error_msg'>Please enter review</span>}

                                        <label>Pages</label>
                                        <input
                                            type="number"
                                            className={!bookValidate.pages.isValid && bookValidate.pages.touched ? 'hasError' : ''}
                                            name='pages'
                                            placeholder="Enter pages"
                                            value={book ? book.pages : ''}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.pages.isValid && bookValidate.pages.touched && <span className='error_msg'>Please enter pages</span>}

                                        <label>Rating</label>
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

                                        <label>Price</label>
                                        <input
                                            type="number"
                                            name='price'
                                            className={!bookValidate.price.isValid && bookValidate.price.touched ? 'hasError' : ''}
                                            placeholder="Enter price"
                                            value={book ? book.price : 0}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.price.isValid && bookValidate.price.touched && <span className='error_msg'>Please enter price</span>}

                                        <div className='image-upload-box'>
                                            {imagePreview !== '' && imagePreview && <img className="img-preview" src={imagePreview} />}
                                            {imagePreview === '' && !imagePreview && !book?.imageUrl && <img className="img-preview" src="/images/image-preview.png" />}
                                            {imagePreview === '' && !imagePreview && book?.imageUrl && <img className="img-preview" src={book.imageUrl} />}
                                            <button type='button' className='upload-btn' onClick={(e) => filePickerClick(e)} >Upload Image</button>
                                            <input
                                                type="file"
                                                ref={fileInputRef as any}
                                                style={{ display: 'none' }}
                                                name="image"
                                                onChange={(event) => onImagePickedChanged(event)} />
                                        </div>
                                        <button type="submit" className="btn w-button">Update</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        </motion.div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        bookValues: state.bookReducer.bookValues,
        bookEdited: state.bookReducer.bookEdited,
        bookDeleted: state.bookReducer.bookDeleted
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmitForm: (formData: FormData) => dispatch(action.updateBook(formData)),
        onGetBook: (id: string) => dispatch(action.getBook(id)),
        unMountBookBookValues: () => dispatch(action.unMountBookBookValues()),
        unMountEditForm: () => dispatch(action.unMountEditForm()),
        onDeleteBook: (bookId: string) => dispatch(action.deleteBook(bookId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)
