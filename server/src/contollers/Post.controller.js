import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from "../schemas/user.js";
import { Photo } from '../schemas/photo.js';
import transporter from '../../mailer.js';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.config();

export const get_users = async (req, res) => {
  try {
    const currentUser = req.user;

    const projection = {
      username: 1,
      photo: 1
    };

    if (currentUser.permissions?.includes("view email")) {
      projection.email = 1;
    } 
    
    if (currentUser.permissions?.includes("view about")) {
      projection.about = 1;
    }

    if (currentUser.permissions?.includes("view phone")) {
      projection.phone = 1;
    }

    const users = await User.find({ status: "active" }, projection);
    res.json(users);
  } catch (err) {
    console.error("Failed to fetch users:", err);
    res.status(500).json({ error: "Server Error" });
  }
};
export const invite_user = async (req, res) => {
  const { email, permissions, frontendUrl } = req.body;

  try {
    const requestingUser = req.user;

    if (!requestingUser.permissions?.includes("invite user")) {
      return res.status(403).json({ message: "Unauthorized to invite users." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.status != 'deleted') {
      return res.status(400).json({ message: "User already invited or registered." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenExpiry = new Date(Date.now() + 5 * 60 * 60 * 1000); 

    const newUser = new User({
      email,
      permissions, 
      inviteToken: token,
      inviteTokenExpires: tokenExpiry,
      status: "invited",
      role: "user", 
    });

    await newUser.save();

    const baseUrl = frontendUrl || process.env.CLIENT_URL;
    const inviteLink = `${baseUrl}/activate/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "You're invited to join!",
      html: `
        <p>Hello! You've been invited to join our platform.</p>
        <p>Click <a href="${inviteLink}">here</a> to activate your account.</p>
        <p>This link will expire in 5 hours.</p>
      `,
    });

    return res.status(200).json({ message: "Invitation sent successfully." });
  } catch (err) {
    console.error("Invite Error:", err);
    return res.status(500).json({ message: "Server error while sending invitation." });
  }
};
export const delete_user = async (req, res) => {
  const { id } = req.params;
  const requestingUser = req.user;

  try {
    if (!requestingUser.permissions.includes("delete user")) {
      return res.status(403).json({ error: "You don't have permission to delete users." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "deleted", email: "" },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json({ message: "User status set to 'deleted'." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};
export const activate_user = async (req, res) => {

  const { token } = req.params;
  const { password, username, phone, about} = req.body;
  const photo = req.file;

  if (!token) {
    return res.status(400).json({ message: "Activation token is required." });
  } ////////////

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required." });
  }


  try {

    const existingUser = await User.findOne({ username: username });
    if (existingUser && existingUser.status != 'deleted') {
      return res.status(400).json({ message: "A user with this username already exists." });
    }

    const user = await User.findOne({ inviteToken: token });

    if (!user || user.inviteTokenExpires < new Date()) {
      return res.status(400).json({ message: "Activation link is invalid or expired." });
    }

    let photoUrl = `${req.protocol}://${req.get('host')}/avatar.jpg`;

    if (photo) {
      try {
        const newPhoto = new Photo({
          data: req.file.buffer,
          contentType: photo.mimetype,
        });
    
        const savedPhoto = await newPhoto.save();
        photoUrl = `${req.protocol}://${req.get('host')}/api/photos/${savedPhoto._id}`;
      } catch (err) {
        console.error('Error saving photo:', err);
      }
    }
  
      
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.username = username;
    user.phone = phone;
    user.about = about;
    user.photo = photoUrl;
    user.status = 'active';
    user.inviteToken = undefined;
    user.inviteTokenExpires = undefined;

    await user.save();
    res.status(200).json({ message: "Account activated successfully." });
  } catch (err) {
    console.error("Activation Error:", err);
    res.status(500).json({ message: 'Server error during activation.' });
  }
};
export const reset_password = async (req, res) => {
  const { email, frontendUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'No user with that email found' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000;

    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS 
      }
    });

    const baseUrl = frontendUrl || process.env.CLIENT_URL;
    const resetUrl = `${baseUrl}/reset-password/${token}`;

    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset</p>
             <p><a href="${resetUrl}">Click here to reset your password</a></p>`
    });

    res.json({ message: 'Reset email sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
};
export const new_password = async (req, res) => {

  const { token, password1, password2 } = req.body;

  if (password1 != password2) {
    return res.status(400).json({ error: "Passords don't match" });
  }

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpires: { $gt: Date.now()},
    });

    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }
    const hashedPassword = await bcrypt.hash(password1, 10);

    user.password = hashedPassword; 
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;

    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
export const edit_user = async (req, res) => {
  const { userId } = req.params;
  const requestingUser = req.user;

  try {
    if (!requestingUser.permissions.includes("edit user")) {
      return res.status(403).json({ error: "You don't have permission to edit users." });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }


    const updates = {};

    if (req.body.email && req.body.email !== user.email) {
      const existingUser = await User.findOne({ email: req.body.email });
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.status(400).json({ error: "Email already exists." });
      }
      updates.email = req.body.email;
    }
    if (req.body.phone) updates.phone = req.body.phone;
    if (req.file) updates.photo = req.file.path; 

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updates,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json( { message: "User updated successfully."})
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error." });
  }
};