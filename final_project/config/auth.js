require('dotenv').config();

const authConfig = {
    jwtSecret: process.env.JWT_SECRET,
};

module.exports = {
    authConfig,
};
