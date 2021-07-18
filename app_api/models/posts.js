const mongoose = require('mongoose');

const filesSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    }
});

const postSchema = new mongoose.Schema({
  userid: {
    type: String,
    required: true
  },
  text: String,
  files: [filesSchema],
  like: {
      type: Number,
      deafult: 0
  },
  share: {
      type: Number,
      default: 0
  },
}, {
    timestamps: true
});


module.exports = {
    postSchema
}


