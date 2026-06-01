const mongoose = require('mongoose');

const demoUsers = [
  {
    _id: 'demo-customer-id',
    name: 'Demo Customer',
    email: 'demo@seatsync.com',
    password: 'demo123',
    role: 'customer',
    phone: '9999999999',
    isActive: true,
    restaurant: null,
  },
  {
    _id: 'demo-owner-id',
    name: 'Demo Owner',
    email: 'owner@seatsync.com',
    password: 'owner123',
    role: 'owner',
    phone: '8888888888',
    isActive: true,
    restaurant: null,
  },
];

const isDemoAuthEnabled = () =>
  process.env.NODE_ENV !== 'production' && mongoose.connection.readyState !== 1;

const sanitizeDemoUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  phone: user.phone,
  restaurant: user.restaurant,
});

const findDemoUserByEmail = (email) =>
  demoUsers.find((user) => user.email.toLowerCase() === String(email).toLowerCase());

const findDemoUserById = (id) => demoUsers.find((user) => user._id === id);

module.exports = {
  demoUsers,
  findDemoUserByEmail,
  findDemoUserById,
  isDemoAuthEnabled,
  sanitizeDemoUser,
};
