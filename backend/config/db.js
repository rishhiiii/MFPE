const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const isDbConnected = () => mongoose.connection.readyState === 1;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    // Keep the API server available so the frontend can degrade gracefully.
  }
};

module.exports = { connectDB, isDbConnected };
