const { param } = require("express-validator");

const isbnValidationInParams = [
    param("isbn")
        .notEmpty()
        .withMessage("ISBN is required")
        .isInt()
        .withMessage("ISBN must be a number")
];

const authorValidationInParams = [
    param("author")
        .notEmpty()
        .withMessage("Author is required")
        .isString()
        .withMessage("Author must be a string")
];

const titleValidationInParams = [
    param("title")
        .notEmpty()
        .withMessage("Title is required")
        .isString()
        .withMessage("Title must be a string")
]

module.exports = {
    isbnValidationInParams,
    authorValidationInParams,
    titleValidationInParams
};
