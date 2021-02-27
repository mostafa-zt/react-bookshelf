const express = require('express');
const { validationResult } = require('express-validator');

const { User } = require('../models/user');
const { Book } = require('../models/book');
const checkAuth = require('../middleware/auth');
const { checkBook, } = require('../middleware/validator');

const router = express.Router();

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

router.post('/book', checkAuth, checkBook(), (req, res, next) => {
    const book = new Book({ ...req.body, ownerId: req.userData.userId });
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        return res.json({
            success: false,
            message: errors.map(e => e.msg).join(' and ')
        });
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

router.post('/bookUpdate', checkAuth, checkBook(), (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        return res.json({
            success: false,
            message: errors.map(e => e.msg).join(' and ')
        });
    }
    Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            success: true,
            message: "The book has been successfully updated.",
            book: doc
        });
    });
});

router.delete('/deleteBook', checkAuth, (req, res, next) => {
    const id = req.query.id;
    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        if (!doc) res.status(404).json(
            {
                success: false,
                message: 'There is any book with this information!'
            });
        res.status(200).json({
            success: true,
            message: 'This book has been successfully deleted from The Book Shelf!'
        });
    });
});


module.exports = router;