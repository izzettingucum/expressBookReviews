const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
let authValidations = require("../validations/authValidations.js");
let authConfig = require("../config/auth.js").authConfig;
let handleValidationErrors = require("../middlewares/handleValidationErrors.js");
const bcrypt = require("bcrypt");
const regd_users = express.Router();

let users = [];

const isValid = (username) =>
    users.some(user => user.username === username);

const authenticatedUser = async (username, password) => { //returns boolean
    const user = users.find(user => user.username === username);

    if (!user) {
        return false;
    }

    return await bcrypt.compare(password, user.password);
}

//only registered users can login
regd_users.post("/login", authValidations.loginValidation, handleValidationErrors, (req, res) => {
    const isAuthenticated = authenticatedUser(req.body.username, req.body.password);

    if (!isAuthenticated) {
        return res.status(401)
            .json({
                error: 'Invalid username or password'
            })
    }

    const token = jwt.sign({ username: req.body.username }, authConfig.jwtSecret, { expiresIn: '1h' });

    return res.status(200)
        .json({
            token: token
        });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    //Write your code here
    return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
