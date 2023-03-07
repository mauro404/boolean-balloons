const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config({ path: 'backend/config/config.env' })
const errorMiddleware = require('./middlewares/errors');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(fileUpload());


// Import all routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');


app.use('/api', products)
app.use('/api', auth)
app.use('/api', payment)
app.use('/api', order)

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app