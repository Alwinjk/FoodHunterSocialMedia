const mongoose = require('mongoose');
const post = require('../models/posts');


const postSchema = post.postSchema;
const Post = mongoose.model('posts', postSchema);


const createPost = (req, res) => {

    const post = new Post();
        
    post.userid = req.body.userid;
    post.text = req.body.text;
    post.images = req.body.images;
    post.videos = req.body.videos;
    post.like = req.body.like;
    post.share = req.body.share;
    post.save((err, data) => {
        if(err) {
            res.status(404)
                .json(err);
        } else {
            res.status(200)
                .json(data);
        }
    });
};


// finding all posts created by a user
const findUserPost = (req, res) => {
    Post.find({ userid: req.params.userid})
        .exec((err, posts) => {
        if (err) {
            res.status(404)
                .json(err);
        } else {
            res.status(200)
                .json(posts);
        }
    });
};

// finding a specific post created by a specific user
const findSpecificPost = (req, res) => {
    Post.findById( req.params.postid)
        .exec((err, post) => {
            if(err) {
                res.status(404)
                    .json( { "message(post id not found)": err});
                    return;
            } else {
                res.status(200)
                    .json(post);
            }
        });
};

// edit a specific post 
const editPost = (req, res) => {
    Post.findById( req.params.postid )
        .exec( (err, post) => {
            if(!Post) {
                res.status(404)
                    .json({ "message" : "post not found" });
                    return;
            } else if (err) {
                res.status(400)
                    .json(err);
                    return;
            }
            post.text = req.body.text;
            post.save( (err, data) => {
                if(err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(data);
                }
            });
        });
};

// delete a specific post
const deletePost = (req, res) => {
    Post.deleteOne({ _id: req.params.postid})
        .exec((err, post) => {
            if(err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(204)
                    .json(post);
            }
        });
        
};

module.exports = {
    createPost,
    findUserPost,
    findSpecificPost,
    editPost,
    deletePost
};