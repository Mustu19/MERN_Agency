const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDb = require('./utils/db')

// Middleware to add in order to use json in express application
// Placed before any routes to ensure it is available for all subsequent route handlers

app.use(express.json())
app.use('/api/auth' , router)

const PORT = 5000 ;

connectDb().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`server listening on ${PORT}`);
    })
})
