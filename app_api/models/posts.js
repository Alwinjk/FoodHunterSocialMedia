const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
        required: true,
    }
});

const videoSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    filename: {
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
  images: imageSchema,
  videos: videoSchema,
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


