const express = require('express');
const router = express.Router();

// router.get('/' , (req , res) => {
//     res.status(200).send("Welcome to the router home app!");
// })

router.route('/').get((req , res) => {
    res.status(200).send("Welcome to the router home app!");
})

router.route('/register').get((req , res) => {
    res.status(200).send("Welcome to the router register app!");
})

module.exports = router;