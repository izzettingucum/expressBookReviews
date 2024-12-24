const express = require('express');
const jwt = require('jsonwebtoken');
const authConfig = require('./config/auth.js').authConfig;
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

app.use(express.json());

app.use("/customer", session({secret: "fingerprint_customer", resave: true, saveUninitialized: true}))

app.use("/customer/auth/*", function auth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer'))
        return res.status(401)
            .json({error: 'Access denied. Token not provided.'});

    const token = authHeader.split(' ')[1];

    jwt.verify(token, authConfig.jwtSecret, (err, decoded) => {
        if (err) {
            const message = err.name === 'TokenExpiredError'
                ? 'Token has expired.'
                : 'Invalid token.';

            return res.status(403).json({
                success: false,
                message
            });
        }

        req.user = decoded;

        next();
    });
});

const PORT = 3000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running"));
