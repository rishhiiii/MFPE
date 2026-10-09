const mongoose = require('mongoose');

mongoose.set('bufferCommands', false);

const isDbConnected = () => mongoose.connection.readyState === 1;

// readyState only tells us a socket is open. A mongod with authorization
// enabled accepts the connection and *then* rejects every command with
// "requires authentication", so a connected-but-unauthenticated server looks
// healthy by readyState alone. Issue a real read (which `ping` is not — mongod
// answers ping without auth) so this check fails exactly when queries would.
const pingDb = async () => {
  if (!isDbConnected()) {
    throw new Error('Not connected to MongoDB');
  }
  await mongoose.connection.db.command({ find: 'users', limit: 1 });
};

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Connecting is not the same as being able to read. Surface a credentials
    // problem at boot instead of as a 500 on the first request.
    try {
      await pingDb();
    } catch (error) {
      console.error(`MongoDB connected but queries are failing: ${error.message}`);
    }
  } catch (error) {
    console.error(`MongoDB connection failed: ${error.message}`);
    // Keep the API server available so the frontend can degrade gracefully.
  }
};

module.exports = { connectDB, isDbConnected, pingDb };
