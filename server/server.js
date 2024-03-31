require("dotenv").config();
const cors = require("cors")
const express = require('express');
const app = express();
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const connectDb = require('./utils/db')
const errorMiddleware = require('./middlewares/error-middleware');
const { coerce } = require("zod");


// Middleware to add in order to use json in express application
// Placed before any routes to ensure it is available for all subsequent route handlers

const corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use('/api/auth' , authRoute)
app.use('/api/form' , contactRoute)
app.use('/api/data' , serviceRoute)

app.use(errorMiddleware)

const PORT = 5000 ;

connectDb().then(() => {
    app.listen(PORT, (req, res) => {
        console.log(`server listening on ${PORT}`);
    })
})
