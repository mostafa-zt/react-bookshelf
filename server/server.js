const express = require('express');
const { check, validationResult, body } = require('express-validator');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const path = require('path');
const app = express();

const { User } = require('./models/user');
const { Book } = require('./models/book');
const { auth } = require('./middleware/auth');
const { checkSignup, checkBook } = require('./middleware/validator');

mongoose.Promise = global.Promise;
// mongoose.connect(config.DATABASE);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('client/build'));

// GET //
app.get('/api/getBook', (req, res, next) => {
    const id = req.query.id;
    Book.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    })
})

app.get('/api/books', (req, res, next) => {
    // localhost:3000/api/books?skip=3&limit=2&order=asc
    const skip = parseInt(req.query.skip);
    const limit = parseInt(req.query.limit)
    const order = req.query.order;
    Book.find().skip(skip).sort({ _id: order }).limit(limit).exec((err, doc) => {
        if (err) return res.status(400).send(err);
        res.send(doc);
    });
});

app.get('/api/getReviewer', (req, res) => {
    const id = req.query.id;
    User.findById(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        });
    });
});

app.get('/api/users', (req, res) => {
    User.find({}, (err, user) => {
        if (err) res.status(400).send(err);
        res.status(200).send(user);
    });
});

app.get('/api/getUserPosts', (req, res, next) => {
    Book.find({ ownerId: req.query.user }, (err, users) => {
        if (err) res.status(400).send(err)
        res.send(users);
    })
})

// POST //
app.post('/api/book', checkBook(), (req, res, next) => {
    const book = new Book(req.body);
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

// UPDATE //
app.post('/api/bookUpdate', checkBook(), (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        return res.json({
            success: false,
            message: errors.map(e => e.msg).join(' and ')
        });
    }
    Book.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            message: "The book has been successfully updated.",
            book: doc
        });
    });
});

// DELETE
app.delete('/api/deleteBook', (req, res, next) => {
    const id = req.query.id;
    Book.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        if (!doc) res.json(
            {
                success: false,
                message: 'There is any book with this information!'
            });
        res.json({
            success: true,
            message: 'This book has been successfully deleted from The Book Shelf!'
        });
    });
});

app.post('/api/register', checkSignup(), (req, res, next) => {
    const errors = validationResult(req).array();
    if (errors.length > 0) {
        return res.json({
            success: false,
            message: errors.map(e => e.msg).join(' and ')
        });
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user)
            return res.json({
                success: false,
                message: 'This email has been already saved!'
            });
        else {
            const user = new User(req.body);
            user.save((err, doc) => {
                if (err) res.status(400).json({ success: false });
                res.status(200).json({
                    success: true,
                    message: 'User has been successfully saved.',
                    user: doc
                });
            });
        }

    });
});

app.post('/api/login', (req, res, next) => {
    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                success: false,
                message: "There is any account with this email!"
            });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({
                    success: false,
                    message: 'Password is wrong!'
                });
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth', user.token).json({
                    success: true,
                    message: 'User has been successfully logged in.',
                    email: user.email,
                    id: user._id
                });
            });
        });
    });
});

app.get('/api/logout', auth, (req, res, next) => {
    req.user.deleteToken(req.token, (err, user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200);
    });
});

app.get('/api/auth', auth, (req, res, next) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname
    });
});

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 3001;
mongoose.connect(config.DATABASE)
    .then(result => {
        console.log('database connected...');
        app.listen(port, () => {
            console.log('server running...');
        })
    })
