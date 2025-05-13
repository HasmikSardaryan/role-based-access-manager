import mongoose from 'mongoose';

const ReplySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    required: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

const Reply = mongoose.model('Reply', ReplySchema);
export default Reply;
