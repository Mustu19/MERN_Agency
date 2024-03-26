const express = require('express');
const router = express.Router();
// const {home , register} = require('../controllers/auth-controller');
const authcontrollers = require('../controllers/auth-controller');

// After creating controllers
router.route('/').get(authcontrollers.home)
router.route('/register').get(authcontrollers.register)


// router.route('/').get((req , res) => {
//     res.status(200).send("Welcome to the router home app!");
// })

// router.route('/register').get((req , res) => {
//     res.status(200).send("Welcome to the router register app!");
// })

module.exports = router;