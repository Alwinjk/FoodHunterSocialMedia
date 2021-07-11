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
    post.createdon = Date.now();
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

const findUserPost = (req, res) => {
    Post.find()
        .exec((err, post) => {
        if (err) {
            res.status(404)
                .json(err);
        } else {
            res.status(200)
                .json(post);
        }
    })
}


module.exports = {
    createPost,
    findUserPost
};