const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;
console.log(`Mongo URI: ${mongoURI}`); // Added to debug

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
