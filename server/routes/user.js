const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const { User } = require('../models/user');
const { Book } = require('../models/book');
const checkAuth = require('../middleware/auth');
const { checkSignup } = require('../middleware/validator');
const config = require('../config/config').get(process.env.NODE_ENV);

const router = express.Router();

router.get('/users', (req, res) => {
    User.find({}, (err, user) => {
        if (err) res.status(400).send(err);
        res.status(200).send(user);
    });
});

router.get('/getUserPosts', checkAuth, (req, res, next) => {
    Book.find({ ownerId: req.userData.userId }, (err, users) => {
        if (err) res.status(400).send(err)
        res.status(200).send(users);
    })
})

router.get('/user-profile', checkAuth, (req, res, next) => {
    User.findById(req.userData.userId, (err, user) => {
        if (err) res.status(400).send(err)
        if (!user) return res.status(400).json({ success: false, messages: [{ msg: "There is not any account with this info" }] });;
        return res.status(200).json(user);
    })
})

router.post("/signup", checkSignup(), (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastname = req.body.lastname;
    const errors = validationResult(req).array().map(err => { return { msg: err.msg, param: err.param } }) || [];
    if (errors.length > 0) {
        // error status 422
        return res.status(400).json({ success: false, messages: errors });
    }
    // const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email }, (err, doc) => {
        if (err) return res.status(500).json({ success: false, messages: [{ msg: "An error occurred while registering the user " }] });
        if (doc) return res.status(400).json({ success: false, messages: [{ msg: "This email has been already saved!" }] });
        bcrypt.hash(password, 10, (err, encryptedPassword) => {
            if (err) return res.status(500).json({ success: false, messages: [{ msg: "An error occurred while registering the user " }] });
            const user = new User({ email: email, password: encryptedPassword, name: name, lastname: lastname });
            user.save((err, user) => {
                if (err) return res.status(500).json({ success: false, messages: [{ msg: "An error occurred while registering the user " }] });
                if (user) {
                    const token = jwt.sign({ email: user.email, userId: user._id }, config.SECRET, { expiresIn: "1h" });
                    return res.status(201).json({
                        success: true,
                        expiresIn: 3600,
                        token: token,
                        message: "Your account has been successfuly registered.",
                        email: user.email,
                        data: user
                    });
                }
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const errors = validationResult(req).array().map(err => { return { msg: err.msg, param: err.param } }) || [];
    if (errors.length > 0) {
        // error status 422
        return res.status(400).json({ success: false, messages: errors });
    }
    User.findOne({ email: email }, (err, user) => {
        if (err) return res.status(500).json({ success: false, messages: [{ msg: "An error occurred!" }] });
        if (!user) {
            errors.push({ msg: "There is not any account with this email!", param: '' })
            return res.status(401).json({ success: false, messages: errors });
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) res.status(500).json({ success: false, messages: [{ msg: "An error occurred while comparing the passowrd" }] });
            if (isMatch) {
                const token = jwt.sign({ email: user.email, userId: user._id }, config.SECRET, { expiresIn: "1h" });
                return res.status(200).json({ token: token, success: true, expiresIn: 3600, email: user.email }); // ==> 3600 seconds = 1 hour
            }
            errors.push({ msg: "There is not any account with this information!", param: '' });
            return res.status(401).json({ success: false, messages: errors });
        })
    })
})

module.exports = router;
