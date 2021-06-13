var express = require('express');
var router = express.Router();
const jwt = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// Authentication routes
const ctrlAuth = require("../controllers/authentication");

router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);
router.get("/login", (req, res) => {
    res.send("Hello User");
});



module.exports = router;