const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    review: {
        type: String,
        default: 'n/a'
    },
    pages: {
        type: String,
        default: 'n/a'
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    price: {
        type: String,
        default: 'n/a'
    },
    ownerId: {
        type: String,
        require: true
    }
}, { timestamps: true })

const Book = mongoose.model('Book', bookSchema);
module.exports = { Book };