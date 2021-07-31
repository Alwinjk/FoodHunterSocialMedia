const mongoose = require('mongoose');
const User = mongoose.model('users');

const userSearch = (req, res) => {
    let userPattern = new RegExp("^" + req.body.query, "i");
    console.log(req.body.query);
    console.log(userPattern);
    User.find({$or: [{firstname: {$regex: userPattern}}, {lastname: {$regex: userPattern}}]})
        .exec((err, user) => {
            if(!user) {
                res.status(404)
                    .json({ "message" : "Userid not found" });
                    return;
            } else if (err) {
                res.status(400)
                    .json(err);
                    return;
            } else {
                res.status(200)
                    .json(user);
            }
        
    }   );
}

module.exports = {
    userSearch
};