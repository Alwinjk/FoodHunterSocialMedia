const mongoose = require('mongoose');
const User = mongoose.model('users');

const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    Bucket: process.env.AWS_BUCKET_NAME
});

const profileImgUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: 'public-read',
        key: function (req, file, cb) {
            cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
        }
    }),
    limits:{ fileSize: 15000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
}).single('profileImage');

function checkFileType( file, cb ){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());
    // Check mime
    const mimetype = filetypes.test( file.mimetype );
    if( mimetype && extname ){
        return cb( null, true );
    } else {
        cb( 'Error: Images Only!' );
    }
}

const avatarUpload = ( req, res ) => {
    profileImgUpload( req, res, ( error ) => {      // expect function error
        console.log( 'requestOkokok', req.file );
        console.log( 'error', error );
        if( error ){
            console.log( 'errors', error );
            res.json( { error: error } );
        } else {
            // If File not found
            if( req.file === undefined ){
                console.log( 'Error: No File Selected!' );
                res.json( 'Error: No File Selected' );
            } else {
                // If Success
                const imageName = req.file.key;
                const imageLocation = req.file.location;// Save the file name into database into profile 
                res.json( {
                    image: imageName,
                    location: imageLocation
                });
                User.findById(req.params.userid)
                    .exec((err, user) => {
                        if(!user) {
                            res.status(404)
                                .json({ "message" : "Userid not found" });
                                return;
                        } else if (err) {
                            res.status(400)
                                .json(err);
                                return;
                        }
                        user.avatar = {
                            image : imageName,
                            url: imageLocation
                        }
                        user.save((err, data) => {
                            if(err) {
                                res.status(404)
                                    .json(err);
                            } else {
                                res.status(200);
                                return;             // expect some kind of error if you put .json(data) instead of return
                            }
                        });
                });
            }
        }
   });
};


const userReadOne = (req, res) => {
    User
        .findById(req.params.userid)
        .exec((err, user) => {
            if(!user) {
                res.status(404)
                    .json({ "message": "user not found" });
                    return;
            } else if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(user);
            }
        });
};


const userUpdate = (req, res) => {

    if(!req.params.userid) {
        res
            .status(404)
            .json({ "message" : "Not found, userid required!"});
            return;
    }
    User
        .findById(req.params.userid)
        .exec((err, user) => {
            if(!user) {
                res.status(404)
                    .json({ "message" : "Userid not found" });
                    return;
            } else if (err) {
                res.status(400)
                    .json(err);
                    return;
            }
            user.firstname = req.body.firstname;
            user.lastname = req.body.lastname;
            user.bio = req.body.bio;
            user.gender = req.body.gender;
            user.dob = req.body.dob;
            user.address = {
                address1: req.body.address.address1,
                address2: req.body.address.address2,
                city: req.body.address.city,
                region: req.body.address.region,
                country: req.body.address.country,
                zipcode: req.body.address.zipcode
            };
            user.save((err, data) => {
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


module.exports = {
    userReadOne,
    userUpdate,
    avatarUpload,
};