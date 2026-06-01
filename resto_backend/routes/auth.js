const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { protect, generateToken } = require('../middleware/auth');
const {
  findDemoUserByEmail,
  isDemoAuthEnabled,
  sanitizeDemoUser,
} = require('../utils/demoAuth');

// Helper to send validation errors
const validate = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return false;
  }
  return true;
};

// ─────────────────────────────────────────
// POST /api/auth/register
// Register as customer or owner
// ─────────────────────────────────────────
router.post(
  '/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('role').optional().isIn(['customer', 'owner']).withMessage('Role must be customer or owner'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;
    try {
      const { name, email, password, role, phone } = req.body;

      if (isDemoAuthEnabled()) {
        return res.status(503).json({
          success: false,
          message: 'Registration is unavailable in demo mode. Use the demo login credentials instead.',
        });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ success: false, message: 'Email already registered.' });
      }

      const user = await User.create({ name, email, password, role: role || 'customer', phone });
      const token = generateToken(user._id);

      res.status(201).json({
        success: true,
        message: 'Registration successful.',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// ─────────────────────────────────────────
// POST /api/auth/login
// ─────────────────────────────────────────
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;
    try {
      const { email, password } = req.body;

      if (isDemoAuthEnabled()) {
        const demoUser = findDemoUserByEmail(email);
        if (!demoUser || demoUser.password !== password) {
          return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const token = generateToken(demoUser._id);

        return res.json({
          success: true,
          message: 'Login successful (demo mode).',
          token,
          user: sanitizeDemoUser(demoUser),
        });
      }

      const user = await User.findOne({ email }).select('+password');
      if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
      }

      if (!user.isActive) {
        return res.status(403).json({ success: false, message: 'Account is deactivated.' });
      }

      const token = generateToken(user._id);

      res.json({
        success: true,
        message: 'Login successful.',
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          restaurant: user.restaurant,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// ─────────────────────────────────────────
// GET /api/auth/me
// Get current logged-in user
// ─────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('restaurant', 'name');
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/auth/update-profile
// Update name, phone, profilePhoto
// ─────────────────────────────────────────
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { name, phone, profilePhoto } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, profilePhoto },
      { new: true, runValidators: true }
    );
    res.json({ success: true, message: 'Profile updated.', user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/auth/change-password
// ─────────────────────────────────────────
router.put(
  '/change-password',
  protect,
  [
    body('currentPassword').notEmpty().withMessage('Current password required'),
    body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters'),
  ],
  async (req, res) => {
    if (!validate(req, res)) return;
    try {
      const user = await User.findById(req.user._id).select('+password');
      if (!(await user.matchPassword(req.body.currentPassword))) {
        return res.status(400).json({ success: false, message: 'Current password is incorrect.' });
      }
      user.password = req.body.newPassword;
      await user.save();
      res.json({ success: true, message: 'Password changed successfully.' });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

module.exports = router;
