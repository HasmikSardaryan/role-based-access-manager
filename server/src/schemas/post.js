import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  points: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  time: { 
    type: Date,
    default: Date.now
  },
  rank: {
    type: Number,
    default: 0
  },  
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],
});

const Post = mongoose.model('Post', postSchema);
export default Post;
