require("dotenv").config();
const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDb = require('./utils/db')
const errorMiddleware = require('./middlewares/error-middleware')


// Middleware to add in order to use json in express application
// Placed before any routes to ensure it is available for all subsequent route handlers

app.use(express.json())
app.use('/api/auth' , router)

app.use(errorMiddleware)

const PORT = 5000 ;

connectDb().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`server listening on ${PORT}`);
    })
})
