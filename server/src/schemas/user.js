import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // unique: true,
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
    // required: true, 
    // unique: true,
    lowercase: true, 
    trim: true 
  },
  phone: {
    type: String,
    default: ''
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
  inviteToken: String, 
});

const User = mongoose.model("User", userSchema);
export default User;
