const express = require('express');
const router = express.Router();
const jwt = require("express-jwt");
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

// Authentication routes
const ctrlAuth = require("../controllers/authentication");

router.post("/register", ctrlAuth.register);
router.post("/login", ctrlAuth.login);
router.get("/login", (req, res) => {
    res.send("Hello User");
});


// user profile routes
const ctrlProfile = require("../controllers/profile");
router.route("/users/:userid")
        .get(ctrlProfile.userReadOne)
        .put(ctrlProfile.userUpdate);
router.route("/users/:userid/avatar")
        .put(upload.single('image'),ctrlProfile.avatarUpdate);
        
router.route("/users/:userid/avatar/:key")
        .get(ctrlProfile.getAvatar);


// post routes
const ctrlPost = require("../controllers/post");
router.route("/post")
        .post(ctrlPost.createPost)
        .get(ctrlPost.findUserPost);
       
module.exports = router;