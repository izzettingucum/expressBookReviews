const { param } = require("express-validator");

const isbnValidationInParams = [
    param("isbn")
        .notEmpty()
        .withMessage("ISBN is required")
        .isInt()
        .withMessage("ISBN must be a number")
];

module.exports = {
    isbnValidationInParams
};
