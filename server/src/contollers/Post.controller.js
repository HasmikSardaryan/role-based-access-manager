import crypto from 'crypto';
import nodemailer from 'nodemailer';
import User from "../schemas/user.js";
import transporter from '../../mailer.js';

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
  const { email, permissions } = req.body;
  try {
    const requestingUser = req.user;

    if (!requestingUser.permissions || !requestingUser.permissions.includes("invite")) {
      return res.status(403).json({ message: "Unauthorized to invite users." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already invited or registered.' });
    }

    const token = crypto.randomBytes(32).toString('hex');

    const newUser = new User({
      email,
      permissions,
      inviteToken: token,
      status: 'invited',
      role: 'user',
    });

    await newUser.save();


    const inviteLink = `http://localhost:3000/activate/${token}`;

    await transporter.sendMail({
      to: email,
      subject: "You're invited to join!",
      text: `Hello! You’ve been invited. Click here to activate your account:\n\n${inviteLink}`,
      html: `<p>Hello! You’ve been invited.</p><p>Click <a href="${inviteLink}">here</a> to activate your account.</p>`,
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