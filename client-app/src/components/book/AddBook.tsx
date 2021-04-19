import { motion } from 'framer-motion';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { BookFromValues, IResponseData } from '../../app/models/book'
import { createBook, unMountCreateBook } from '../../app/stores/actions/book';

interface IBookValidation {
    name: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean },
    author: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean },
    review: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
    price: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
    rating: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
    pages: { validation: { required: boolean, maxLenght: number, minLenght: number }, isValid: boolean, touched: boolean }
    image: { validation: { required: boolean }, isValid: boolean, touched: boolean }
}

interface IProps extends RouteComponentProps {
    onSubmitForm: (formData: FormData) => void;
    bookCreation: IResponseData;
    unMountBookCreation: () => void;
}

const AddBook: React.FC<IProps> = ({ onSubmitForm, history, bookCreation, unMountBookCreation }) => {

    const bookValidation: IBookValidation = {
        name: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: false,
            touched: false
        },
        author: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: false,
            touched: false
        },
        review: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: false,
            touched: false
        },
        price: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: false,
            touched: false
        },
        pages: {
            validation: {
                required: true,
                maxLenght: 25,
                minLenght: 5,
            },
            isValid: false,
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
        },
        image: {
            validation: {
                required: true
            },
            isValid: true,
            touched: false
        }
    }


    const fileInputRef = useRef(null);
    const [book, setBook] = useState(new BookFromValues());
    const [bookValidate, setBookValidate] = useState(bookValidation);
    const [imagePreview, setImagePreview] = useState<string>("");

    useEffect(() => {
        return () => {
            unMountBookCreation();
        }
    }, [unMountBookCreation])

    const submitHandler = (event: React.SyntheticEvent) => {
        event.preventDefault();
        let isValidForm = !(Object.values(bookValidate)).some(ele => ele.isValid === false);
        if (isValidForm) {
            let formData = new FormData();
            formData.append('author', book.author);
            formData.append('name', book.name);
            formData.append('ownerId', book.ownerId);
            formData.append('pages', book.pages as any);
            formData.append('price', book.price as any);
            formData.append('rating', book.rating as any);
            formData.append('review', book.review);
            if (book!.image) {
                formData.append("image", book!.image as any, book!.name);
            }
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
        setBook({ ...book, [name]: value });
        const element = bookValidate[name as keyof IBookValidation]
        let isValid = true;
        if (bookValidate[name as keyof IBookValidation].validation.required) {
            isValid = value !== '' && value !== null;
        }
        const elementValidation = { ...element, isValid: isValid, touched: true }
        setBookValidate({ ...bookValidate, [name]: elementValidation })
    }

    const onImagePickedChanged = (event: React.SyntheticEvent) => {
        const { files, name } = event.currentTarget as HTMLInputElement;
        if ((event.target as HTMLInputElement).files![0]) {
            const file = (event.target as HTMLInputElement).files![0];
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
                setBook({ ...book, [name]: files![0] });
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
                            Edit The Highly Sensitive: How to Stop Emotional Overload, Relieve Anxiety, and
                            Eliminate Negative Energy
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
                                    {bookCreation && bookCreation.success ?
                                        (
                                            <Fragment>
                                                <div className='user_msg show success'>
                                                    <div>{bookCreation.message}</div>
                                                    <div>
                                                        <Link className="link" to={`/book-details/${bookCreation.bookId}`}>
                                                            Click here to see the book information...
                                                    </Link>
                                                    </div>
                                                </div>
                                                {redirect()}
                                            </Fragment>

                                        ) : bookCreation && !bookCreation.success ?
                                            (
                                                <div className='user_msg show danger'>{bookCreation.message}</div>
                                            ) : null
                                    }
                                    <form noValidate={true} onSubmit={(event) => submitHandler(event)} className="submitform">
                                        <label>Name</label>
                                        <input
                                            type="text"
                                            className={!bookValidate.name.isValid && bookValidate.name.touched ? 'hasError' : ''}
                                            name='name'
                                            placeholder="Enter name"
                                            // value={book.name}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.name.isValid && bookValidate.name.touched && <span className='error_msg'>Please enter name</span>}

                                        <label>Author</label>
                                        <input
                                            type="text"
                                            className={!bookValidate.author.isValid && bookValidate.author.touched ? 'hasError' : ''}
                                            name='author'
                                            placeholder="Enter author"
                                            // value={book.author}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.author.isValid && bookValidate.author.touched && <span className='error_msg'>Please enter author</span>}

                                        <label>Review</label>
                                        <textarea
                                            cols={6} rows={10}
                                            className={!bookValidate.review.isValid && bookValidate.review.touched ? 'hasError' : ''}
                                            name='review'
                                            placeholder="Enter review"
                                            // value={book.review}
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
                                            // value={book.pages}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.pages.isValid && bookValidate.pages.touched && <span className='error_msg'>Please enter pages</span>}

                                        <label>Rating</label>
                                        <select
                                            value={book.rating}
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
                                            // value={book.price}
                                            onChange={(event) => handleInputChanges(event)}
                                        />
                                        {!bookValidate.price.isValid && bookValidate.price.touched && <span className='error_msg'>Please enter price</span>}

                                        <div className='image-upload-box'>
                                            {imagePreview !== '' && imagePreview && <img className="img-preview" src={imagePreview} />}
                                            {imagePreview === '' && !imagePreview && <img className="img-preview" src="/images/image-preview.png" />}
                                            <button type='button' className='upload-btn' onClick={(e) => filePickerClick(e)} >Upload Image</button>
                                            <input
                                                type="file"
                                                ref={fileInputRef as any}
                                                style={{ display: 'none' }}
                                                name="image"
                                                onChange={(event) => onImagePickedChanged(event)} />
                                        </div>
                                        <button type="submit" className="btn w-button">Add New Book</button>
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
        bookCreation: state.bookReducer.bookCreation
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmitForm: (formData: FormData) => dispatch(createBook(formData)),
        unMountBookCreation: () => dispatch(unMountCreateBook())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBook)
