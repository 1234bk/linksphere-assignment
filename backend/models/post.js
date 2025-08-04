const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: String,
  username: String,
  text: String,
  date: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  postId: { type: String, required: true },
    heading: { type: String, required: true },
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    username: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // image URL
  date: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
