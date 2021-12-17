const mongoose = require('mongoose');

const booksSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    bookStatus: String
})

module.exports.Book = mongoose.model('books',booksSchema)