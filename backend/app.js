const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
const path = require('path');
const cors = require("cors");

const errorMiddleware = require('./middlewares/errors');

// if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
dotenv.config({ path: 'backend/config/config.env' });

const corsOptions ={
    origin: process.env.FRONTEND_URL, 
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

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

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'))
    })
}

//Middleware to handle errors
app.use(errorMiddleware);

module.exports = app