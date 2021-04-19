const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const { User } = require('../models/user');
const { Book } = require('../models/book');
const checkAuth = require('../middleware/auth');
const { checkBook } = require('../middleware/validator');
const cloudinaryUtility = require('../util/cloudinaryUtility');

const router = express.Router();

const upload = multer();

// GET //
router.get('/getBook', (req, res, next) => {
    const id = req.query.id;
    Book.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

router.get('/books', (req, res, next) => {
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit)
    const order = req.query.order;
    Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    });
});

router.get('/getReviewer', (req, res) => {
    const id = req.query.id;
    User.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        });
    });
});

router.post('/book', checkAuth, upload.single('image'), checkBook(), async (req, res, next) => {
    const book = new Book({ ...req.body, ownerId: req.userData.userId });
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        return res.json({
            success: false,
            message: errors.map(e => e.msg).join(' and ')
        });
    }

    if (req.file) {
        const uplaodResult = await cloudinaryUtility.streamUpload(req.file);
        if (uplaodResult) {
            book.imageUrl = uplaodResult.url;
            book.publicId = uplaodResult.public_id;
        }
    }

    book.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            message: "The new book has been successfully placed in The Book Shelf.",
            bookId: doc._id
        })
    })
});

router.post('/bookUpdate', checkAuth, upload.single('image'), checkBook(), async (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        return res.json({
            success: false,
            message: errors.map(e => e.msg).join(' and ')
        });
    }

    const book = await Book.findById(req.body._id);
    if (req.file) {
        const uplaodResult = await cloudinaryUtility.streamUpload(req.file);
        if (uplaodResult) {
            await cloudinaryUtility.removeFile(book.publicId);
            book.imageUrl = uplaodResult.url;
            book.publicId = uplaodResult.public_id;
        }
    }

    book.name = req.body.name;
    book.author = req.body.author;
    book.review = req.body.review;
    book.pages = req.body.pages;
    book.rating = req.body.rating;
    book.price = req.body.price;

    const result = await book.save();

    if (!result) {
        return res.status(400).send(err);
    }

    res.status(200).json({
        success: true,
        message: "The book has been successfully updated.",
        book: result
    });

    // Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
    //     if (err) return res.status(400).send(err);
    //     res.status(200).json({
    //         success: true,
    //         message: "The book has been successfully updated.",
    //         book: doc
    //     });
    // });
});

router.delete('/deleteBook', checkAuth, async (req, res, next) => {
    const id = req.query.id;
    const book = await Book.findById(id);

    if (!book) {
        res.status(404).json(
            {
                success: false,
                message: 'There is any book with this information!'
            });
    }

    const publicId = book.publicId;
    const result = await book.remove();

    if (!result) {
        result.status(500).json(
            {
                success: false,
                message: 'Remove operation failed. please try again.'
            });
    }

    if (publicId)
        await cloudinaryUtility.removeFile(publicId);

    res.status(200).json({
        success: true,
        message: 'This book has been successfully deleted from The Book Shelf!',
        book: result
    });

    // Book.findByIdAndRemove(id, (err, doc) => {
    //     if (err) return res.status(400).send(err);
    //     if (!doc) res.status(404).json(
    //         {
    //             success: false,
    //             message: 'There is any book with this information!'
    //         });
    //     res.status(200).json({
    //         success: true,
    //         message: 'This book has been successfully deleted from The Book Shelf!'
    //     });
    // });
});

router.get('/get-new-books', (req, res, next) => {
    Book.find().sort({ 'createdAt': -1 }).limit(3).exec((err, docs) => {
        if (err) return res.status(400).send(err);
        res.send(docs);
    })
})


module.exports = router;