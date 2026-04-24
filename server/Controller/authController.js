const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../Model/UserModel');
const AdoptQuery = require('../Model/AdoptQueryModel');
const GivePet = require('../Model/GivePetModel');
const EmergencyReport = require('../Model/EmergencyReportModel');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const signToken = (user) =>
  jwt.sign(
    {
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
      name: user.name
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

const signup = async (req, res) => {
  try {
    console.log('signup body', req.body);
    const { name, email, phone, password, city } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    const exists = await User.findOne({ email: email.toLowerCase() });
    if (exists) {
      return res.status(409).json({ error: 'Email already registered.' });
    }
    const user = await User.create({
      name,
      email,
      phone: phone || '',
      password,
      city: city || '',
      role: 'user'
    });

    const token = signToken(user);
    res.status(201).json({ token, user: user.toSafeJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    console.log('login body', req.body);
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required.' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const ok = await user.comparePassword(password);
    if (!ok) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const token = signToken(user);
    res.status(200).json({ token, user: user.toSafeJSON() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const logout = (req, res) => {
  res.status(200).json({ message: 'Logged out. Remove token on the client.' });
};

const forgotPassword = async (req, res) => {
  try {
    console.log('forgot body', req.body);
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email required.' });
    }
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(200).json({
        message: 'If that email exists, reset instructions would be sent.'
      });
    }
    const token = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();
    res.status(200).json({
      message: 'Use the reset token with POST /api/auth/reset-password (email delivery not configured).',
      resetToken: process.env.NODE_ENV === 'production' ? undefined : token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    console.log('reset body', req.body);
    const { token, password } = req.body;
    if (!token || !password) {
      return res.status(400).json({ error: 'Token and new password required.' });
    }
    if (password.length < 8) {
      return res.status(400).json({ error: 'Password must be at least 8 characters.' });
    }
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: new Date() }
    });
    if (!user) {
      return res.status(400).json({ error: 'Invalid or expired reset token.' });
    }
    user.password = password;
    user.resetPasswordToken = '';
    user.resetPasswordExpires = null;
    await user.save();
    res.status(200).json({ message: 'Password updated. You can log in now.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const meRequests = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.userId)) {
      return res.status(200).json({
        adoptionRequests: [],
        givePetRequests: [],
        emergencyReports: []
      });
    }
    const uid = new mongoose.Types.ObjectId(req.user.userId);
    const [adoptionRequests, givePetRequests, emergencyReports] = await Promise.all([
      AdoptQuery.find({ userId: uid }).sort({ createdAt: -1 }).lean(),
      GivePet.find({ userId: uid }).sort({ createdAt: -1 }).lean(),
      EmergencyReport.find({ userId: uid }).sort({ createdAt: -1 }).lean()
    ]);
    res.status(200).json({ adoptionRequests, givePetRequests, emergencyReports });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const listUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -resetPasswordToken -resetPasswordExpires')
      .sort({ createdAt: -1 })
      .lean();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  signup,
  login,
  profile,
  logout,
  forgotPassword,
  resetPassword,
  meRequests,
  listUsers
};
