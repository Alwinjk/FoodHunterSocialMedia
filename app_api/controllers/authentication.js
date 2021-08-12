const passport = require('passport');
const mongoose = require('mongoose');
const crypto = require('crypto') 
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const User = mongoose.model('User');

// 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

// const transporter = nodemailer.createTransport(sendgridTransport({
//     auth:{
//         api_key: "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"
//     }
// }))

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

const resetPassowrd = (req, res) => {
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log(err);
        }
        const token = buffer.toString("hex");
        User.findOne({email: req.body.email})
            .then(user => {
                if(!user){
                    return res.status(422)
                                .json({err: "User does not exist with this email"});
                } 
                user.resetToken = token;
                user.expireToken = Date.now() + 3600000;
                user.save()
                    .then(result => {
                        console.log(user.email)
                        transporter.sendMail({
                            from: '"FoodHunter 👻" <foodhuntermedia@outlook.com>', // sender address
                            to: req.body.email, // list of receivers
                            subject: "Reset Your Password ✔", // Subject line
                            // text: "Hello world?", // plain text body
                            html: `Click <a href="http://localhost:3000/reset-password/${token}>here</a> to reset your password"`, // html body
                        })
                        res.json({message: "check your email"})
                    })
            })
    })
}

const setNewPassword = (req, res) => {
    const newPassword = req.body.password;
    const sentToken = req.params.token;
    User.findOne({resetToken:sentToken,expireToken: {$gt: Date.now()}})
        .then(user => {
            if(!user){
                return res.status(422)
                        .json({error: "Try again, session expired"})
            }
            user.setPassword(req.body.password);
            user.resetToken = undefined;
            user.expireToken = undefined;
            user.save()
                .then(savedUser => {
                    res.json({message: "Password updated successfully"});
                })

        })
}

module.exports = {
    register,
    login,
    resetPassowrd,
    setNewPassword
};