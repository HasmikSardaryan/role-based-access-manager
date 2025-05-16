import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from "../schemas/user.js";
import transporter from '../../mailer.js';
import dotenv from 'dotenv';

dotenv.config();

export const get_users = async (req, res) =>  {
  try {
    const users = await User.find({ status: "active" });
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

    if (!requestingUser.permissions?.includes("invite")) {
      return res.status(403).json({ message: "Unauthorized to invite users." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already invited or registered.' });
    }

    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiry = new Date(Date.now() + 5 * 60 * 60 * 1000); // 5 hours

    const newUser = new User({
      email,
      permissions,
      inviteToken: token,
      inviteTokenExpires: tokenExpiry,
      status: 'invited',
      role: 'user',
    });

    await newUser.save();

    const baseUrl = frontendUrl || process.env.CLIENT_URL;
    const inviteLink = `${baseUrl}/activate/${token}`;


    await transporter.sendMail({
      to: email,
      subject: "You're invited to join!",
      html: `
      <p>Hello! You've been invited.</p>
      <p>Click <a href="${inviteLink}">here</a> to activate your account.</p>
      <p>This link will expire in 5 hours.</p>
      `,
    });


    res.status(200).json({ message: 'Invitation sent successfully.' });

  } catch (err) {
    console.error("Invite Error:", err);
    res.status(500).json({ message: 'Server error while sending invitation.' });
  }
};
export const delete_user = async (req, res) => {
  const { id } = req.params;
  const requestingUser = req.user;

  try {

    if (!requestingUser.permissions.includes("delete")) {
      return res.status(403).json({ error: "You don't have permission to delete users." });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status: "deleted" },
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
  console.log(req.body);
  const { password } = req.body;

  try {
    const user = await User.findOne({ inviteToken: token });

    if (!user || user.inviteTokenExpires < new Date()) {
      return res.status(400).json({ message: "Activation link is invalid or expired." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
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