const express = require('express');
const bcrypt = require('bcrypt');
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let bookValidations = require("../validations/bookValidations.js");
let authValidations = require("../validations/authValidations.js");
let bookRepository = require("../repositories/bookRepository.js");
let handleValidationErrors = require("../middlewares/handleValidationErrors.js");
const public_users = express.Router();

public_users.post("/register", authValidations.registerValidation, handleValidationErrors, async (req, res) => {
    const isUserExist = isValid(req.body.username);

    if (isUserExist) {
        return res.status(409)
            .json({
                error: 'User already exists'
            })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    users.push({
        username: req.body.username,
        password: hashedPassword
    })

    return res.status(201)
        .json({
            message: 'User registered successfully'
        });
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
    const book = bookRepository.getBookByIsbn(req.params.isbn)

    if (!book) {
        return res.status(404)
            .json({
                error: 'Book not found'
            })
    }

    return res.status(200)
        .json({
            data: book
        })
});

// Get book details based on author
public_users.get('/author/:author', bookValidations.authorValidationInParams, handleValidationErrors, function (req, res) {
    const book = bookRepository.getBookByAuthor(req.params.author)

    if (!book) {
        return res.status(404)
            .json({
                error: 'Book not found'
            })
    }

    return res.status(200).json({
        data: book
    })
});

// Get all books based on title
public_users.get('/title/:title', bookValidations.titleValidationInParams, handleValidationErrors, function (req, res) {
    const book = bookRepository.getBookByTitle(req.params.title)

    if (!book) {
        return res.status(404)
            .json({
                error: 'Book not found'
            })
    }

    return res.status(200)
        .json({
            data: book
        })
});

//  Get book review
public_users.get('/review/:isbn', bookValidations.isbnValidationInParams, handleValidationErrors, function (req, res) {
    const reviews = bookRepository.getBookReviewsByIsbn(req.params.isbn)

    if (!reviews) {
        return res.status(404)
            .json({
                error: 'Book review not found'
            })
    }

    return res.status(200)
        .json({
            data: reviews
        })
});

module.exports.general = public_users;
