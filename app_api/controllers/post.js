const mongoose = require('mongoose');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const Post = mongoose.model('Post');
const User = mongoose.model('User');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET_NAME
});

const uploadsBusinessGallery = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
        cb( null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
        }
    }),
    limits:{ fileSize: 150000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
}).array( 'galleryImage', 4 );

function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|mpg|mpeg|avi|wmv|mov|webm|mp4/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );
    if( mimetype && extname ){
        return cb( null, true );
    } else {
        cb( 'Error: Images or Videos Only!' );
    }
}

const createPost = ( req, res ) => {
    
    uploadsBusinessGallery( req, res, ( error ) => {
        
        // console.log( 'files', req.files );
        if( error ){
            console.log( 'errors', error );
            res.json( { error: error } );
        } else {
            const galleryImgLocationArray = [];
            // If File not found
            if( req.files === undefined ){
                console.log( 'No File Selected!' );
            } else {
            // If Success
                let fileArray = req.files,
                fileLocation,
                fileName,
                file;
                for ( let i = 0; i < fileArray.length; i++ ) {
                    fileLocation = fileArray[ i ].location;
                    fileName = fileArray[ i ].key;
                    file = {
                        filename: fileName,
                        url: fileLocation
                    }
                    console.log( 'URL', fileLocation );
                    console.log('file name', fileName);

                    galleryImgLocationArray.push( file );
                    console.log("Gallery ", galleryImgLocationArray);
                }
            }
            // Save the file name into database
            const post = new Post();
            User.findById(req.params.userid)
                .then(user => {
                    req.body.user = user._id;
                    console.log(req.body.user)
                    
                });
            post.user = mongoose.Types.ObjectId(req.params.userid);
            post.text = req.body.text;
            console.log(post.text);
            if(galleryImgLocationArray === undefined){
                post.files = [];
            } else {
                post.files = galleryImgLocationArray;
            }
            post.like = req.body.like;
            post.share = req.body.share;
            console.log("post", post)
            post.save((err, data) => {
                if(err) {
                    res.status(404)
                        .json(err);
                } else {
                    res.status(200)
                        .json(data);
                }
            });
        }
    });
};


// finding all posts created by a user
const findUserPost = (req, res) => {
    Post.find({ user: req.params.userid})
        .sort({ updatedAt: -1})
        .select('-__v ')
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
        .populate('user')
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

// find all posts
const findAllPosts = (req, res) => {
    Post.find()
        .sort({ updatedAt: -1})
        .exec((err, posts) => {
            if(err){
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(posts);
            }
        })
}

// find all posts from following users
const findFollowingPosts = (req, res) => {
    console.log("following array", req.body.followingArray);
    console.log("userid", req.body.userid);
    // res.json("Hello");
    Post.find({
            $or: [
                {user: {$in: req.body.followingArray}},
                {user: {$eq: req.body.userid}}
            ]
        })
        .sort({ updatedAt: -1})
        .populate('user')
        .populate('comments.user')
        .exec((err, post) => {
            if(err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(post);
            }
        });
};

const addALike = (req, res) => {
    Post.findByIdAndUpdate(req.body.postid, { 
        $addToSet: { 
            like: mongoose.Types.ObjectId(req.body.userid)
        }
    },
    {
        new: true
    }
    ).exec((err, post) => {
        if(err){
            return res.status(422)
                        .json(err);
        } else {
            res.status(200)
                .json(post);
        }
    });
};

const removeLike = (req, res) => {
    Post.findByIdAndUpdate(req.body.postid, {
        $pull: {
            like: req.body.userid
        }
    },
    {
        new: true
    }).exec((err, post) => {
        if(err){
            return res.status(422)
                        .json(err);
        } else {
            res.status(200)
                .json(post);
        }
    });
};

const createComment = (req, res) => {
    const comment = {
        text: req.body.text,
        user: mongoose.Types.ObjectId(req.body.userid)
    };
    Post.findByIdAndUpdate(req.body.postid,{
        $push: {comments: comment}
    },{
        new: true
    })
    .populate('comments.user')
    .exec((err, post) => {
        if(err){
            return res.status(422)
                .json(err);
        } else {
            res.status(200)
                .json(post);
        }
    });
};

const deleteComment = (req, res) => {
    Post.findByIdAndUpdate(req.body,postid, {
        $pull: { 
            comments: {
                text: {
                    $eq: req.body.text
                }
            }
        }
    },{
        new: true
    })
    .exec((err, post) => {
        if(err){
            return res.status(422)
                .json(err);
        } else {
            res.status(200)
                .json(post);
        }
    });
};

module.exports = {
    createPost,
    findUserPost,
    findSpecificPost,
    editPost,
    deletePost, 
    findAllPosts,
    findFollowingPosts,
    addALike,
    removeLike,
    createComment,
    deleteComment
};