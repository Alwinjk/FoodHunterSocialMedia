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
        .put(ctrlProfile.avatarUpload);


// post routes
const ctrlPost = require("../controllers/post");
router.route("/post")
        .post(ctrlPost.createPost); // To create a new post
router.route("/post/:userid/posts")
        .get(ctrlPost.findUserPost); // To display all the posts from a specific user
// To edit a specific post from a specific user
router.route("/post/:userid/posts/:postid")
        .get(ctrlPost.findSpecificPost)
        .put(ctrlPost.editPost)
        .delete(ctrlPost.deletePost);
module.exports = router;