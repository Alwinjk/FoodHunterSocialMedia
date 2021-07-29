const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const avatarSchema = new mongoose.Schema({
  image: String,
  url: String,
},
{
  timestamps: true
});

const addressSchema = new mongoose.Schema({
  address1: {
    type: String,
    requried: true
  },
  address2: String,
  city: {
    type: String,
    required: true
  },
  region: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
  }

});

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  hash: String,
  salt: String,
  bio: String,
  gender: String,
  dob: Date,
  following: {
    type: [String],
    unique: true
  },
  followers: {
    type: [String],
    unique: true
  },
  address: addressSchema,
  avatar: avatarSchema
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
};

userSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
    .toString('hex');
  return this.hash === hash;
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    exp: parseInt(expiry.getTime() / 1000, 10),
  }, process.env.JWT_SECRET);
};
mongoose.model('users', userSchema);