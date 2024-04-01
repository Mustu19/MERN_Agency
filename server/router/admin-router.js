const express = require('express')
const router = express.Router()
const adminController = require("../controllers/admin-controller");
const adminMiddleware = require('../middlewares/admin-middleware');
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/users").get(authMiddleware, adminMiddleware , adminController.getAllUsers)
router.route("/contacts").get(authMiddleware, adminMiddleware , adminController.getAllContacts)
router.route("/users/delete/:id").delete(authMiddleware, adminMiddleware, adminController.deleteUserById);


module.exports = router