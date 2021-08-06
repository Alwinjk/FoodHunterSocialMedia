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

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

})

const postSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: String,
  files: [filesSchema],
  like: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [commentSchema]
}, {
    timestamps: true
});


mongoose.model('Post', postSchema);


