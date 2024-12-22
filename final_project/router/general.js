const express = require('express');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let bookValidations = require("../validations/bookValidations.js");
let bookRepository = require("../repositories/bookRepository.js");
let handleValidationErrors = require("../middlewares/handleValidationErrors.js");
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
    const books = bookRepository.getAllBooks()

    return res.status(200)
        .json({
            data: books
        });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', bookValidations.isbnValidationInParams, handleValidationErrors, (req, res) => {
    const isbn = req.params.isbn

    const book = bookRepository.getBookByIsbn(isbn)

    if (!book) {
        res.status(404).json({
            error: 'Book not found'
        })
    }

    res.status(200).json({
        data: book
    })
});

// Get book details based on author
public_users.get('/author/:author', bookValidations.authorValidationInParams, handleValidationErrors,  function (req, res) {
    const author = req.params.author

    const book = bookRepository.getBookByAuthor(author)

    if (!book) {
        res.status(404).json({
            error: 'Book not found'
        })
    }

    res.status(200).json({
        data: book
    })
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
