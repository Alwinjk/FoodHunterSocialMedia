const mongoose = require('mongoose');
const User = mongoose.model('users');

// display all users except current user
const userReadAllExceptCurrent = (req, res) => {
    User
        .find({ _id: { $ne: req.params.userid } })
        .exec((err, users) => {
            if(!users) {
                res.status(404)
                    .json({ "message": "users not found" });
                    return;
            } else if (err) {
                res.status(404)
                    .json(err);
            } else {
                res.status(200)
                    .json(users);
            }
        });
};

// view another user
const readAUserProfile = (req, res) => {
    User
        .findById(req.params.userid)
        .select('-salt -hash -__v ')
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
}

module.exports = {
    userReadAllExceptCurrent,
    readAUserProfile
};