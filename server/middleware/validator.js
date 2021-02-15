const { body } = require('express-validator');

const checkSignup = () => [
    body('email').isEmail().withMessage('Email is not in correct format!').trim(),
    body('password', 'Password should be at least 4 character!').isLength({ min: 4 }),
    body('confirmPassword', 'Password is not match!').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password is not match!');
        }
        return true;
    }),
];

const checkBook = () => [
    body("author", "Enter the author!").notEmpty().isString().trim(),
    body("name", "Enter the name!").notEmpty().isString().trim(),
    body("review", "Enter the review!").notEmpty().isString().trim(),
    body("pages", "Page should be only number!").isNumeric().trim(),
    body("price", "Price is not valid!").isFloat(),
    body("rating", "Rating is not valid!").isNumeric()
]

module.exports = { checkSignup, checkBook }