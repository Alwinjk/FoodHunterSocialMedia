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

module.exports = {
    userReadAllExceptCurrent
};