import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
  },
  status: {
    type: String,
    enum: ['invited', 'active', 'deleted'], 
    default: 'invited'
  },
  about: {
    type: String,
    default: "",
  },
  email: { 
    type: String, 
    lowercase: true, 
    unique: true, 
    trim: true 
  },
  phone: {
    type: String,
    default: ''
  },
  photo: {
    type: String
  },
  role: {
    type: String,
    enum: ['user', 'admin'], 
    default: 'user',
  },
  permissions: {
    type: [String],
    default: []
  },
  inviteToken: {
    type: String,
  },
  inviteTokenExpires: {   
    type: Date,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpires: {   
    type: Date,
  }
});

const User = mongoose.model("User", userSchema);
export default User;
