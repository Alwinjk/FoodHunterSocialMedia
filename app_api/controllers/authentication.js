const passport = require('passport');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const User = mongoose.model('users');

const register = (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        res
            .status(400)
            .json({ "message": "All fields required" });
            return;
    }

    const user = new User();
    user.firstname = req.body.firstname;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save((err) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            // const token = user.generateJwt();
            res
                .status(200)
                .json(user);
            confirmAccount(user.email);
        }
    })
};

const login = (req, res) => {
    if (!req.body.email || !req.body.password) {
         res
            .status(400)
            .json({ "message": "All fields required" });
            return;
    }
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            res
                .status(404)
                .json(err);
                return;
        }
        if (user) {
            const token = user.generateJwt();
             res
                .status(200)
                .json({user, token});
        } else {
            res
                .status(401)
                .json(info);
        }
    })(req, res);
};

const randString = () => {
    const len = 8;
    let randStr = '';
    for(let i = 0; i < len; i++) {
        const ch = Math.floor((Math.random() * 10) + 1);
        randStr += ch;
    }
    return randStr;
}
async function confirmAccount(email, uniqueString){


    const transporter = nodemailer.createTransport({
        service: "hotmail",
        // host: "foodhuntermedia@outlook.com",
        // port: 587,
        // secure: false,
        auth: {
            user: "foodhuntermedia@outlook.com",
            pass: "TheSocialMedia@AK&AP2021"
        }
    });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"FoodHunter 👻" <foodhuntermedia@outlook.com>', // sender address
    to: "alwinjk1997@gmail.com", // list of receivers
    subject: "Verify your e-mail ✔", // Subject line
    // text: "Hello world?", // plain text body
    html: `Press <a href=http:localhost:8000/verify/${uniqueString}> here </a> to verify youre email. Thanks`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
}

module.exports = {
    register,
    login
};