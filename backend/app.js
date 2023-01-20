const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');

const errorMiddleware = require('./middlewares/errors');

app.use(express.json());
app.use(cookieParser());


// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');


app.use('/api', products)
app.use('/api', auth)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app