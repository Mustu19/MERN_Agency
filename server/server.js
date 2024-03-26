const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).send("Welcome to the app!");
})

app.get('/register', (req, res) => {
    res.status(200).send("Welcome to the register app!");
})

const PORT = 5000 ;
app.listen(PORT, (req, res) => {
    console.log(`server listening on ${PORT}`);
})