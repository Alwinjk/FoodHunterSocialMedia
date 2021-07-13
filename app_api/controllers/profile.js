const mongoose = require('mongoose');
const User = mongoose.model('users');
const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)
const { uploadFile, getFileStream } = require('../s3')

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

const avatarUpdate = async (req, res) => {
    const file = req.file;
    console.log(file);
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    // res.send({imagePath: `/images/${result.Key}`})
    console.log("Key : " + result.key);

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
            
            user.avatar = {
                key: result.Key,
                updatedon: Date.now()
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

const getAvatar = (req, res) => {
    // console.log(req.params);
    // const key = req.params.key;
    // console.log("Inside get avatar : " + key);
    // const readStream = getFileStream(key);
  
    // readStream.pipe(res);
    res.send("Hello");
};



module.exports = {
    userReadOne,
    userUpdate,
    avatarUpdate,
    getAvatar
};