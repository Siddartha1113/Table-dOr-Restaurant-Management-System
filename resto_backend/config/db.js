const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    const message = `MongoDB connection error: ${error.message}`;
    if (process.env.NODE_ENV === 'production') {
      console.error(`❌ ${message}`);
      process.exit(1);
    }

    console.warn(`⚠️ ${message}`);
    console.warn('⚠️ Running in development without MongoDB. Demo auth mode is enabled.');
    return false;
  }
};

module.exports = connectDB;
