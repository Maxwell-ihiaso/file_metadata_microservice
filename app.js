const express = require('express');
const createError = require('http-errors');
const cors = require('cors');
const morgan = require('morgan');
const indexRoute = require('./server/routes/indexRoute');
const apiRoute = require('./server/routes/apiRoute');
require('dotenv').config();
require('./server/db/connectDB');


// Initialize express 
const app = express();

// Set view engine 
app.set('view engine', 'ejs');

app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.static('./public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle request to server
app.use('/', indexRoute);
app.use('/api', apiRoute);

// handle all request to non existing routes 
app.use((req, res, next) => {
    next(createError.NotFound('The page does not exist'));
})

// handles all errors on the server 
app.use((err, req, res, next) => {
    res.status( err.status || 500 ).json({
        error: {
            status: err.status || 500,
            message: err.message
        }
    })
})

// spin server and set port for coonection 
const PORT = process.env.PORT || 5050
app.listen(PORT, (err) => {
    if (err) return console.log(err);
    console.log(`Server started in ${process.env.NODE_ENV} mode, running on http://localhost:${PORT}`)
});