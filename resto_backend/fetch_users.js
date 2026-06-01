require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const getUsers = async () => {
  try {
    await connectDB();
    const users = await User.find().select('name email role');
    console.log(JSON.stringify(users, null, 2));
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

getUsers();
