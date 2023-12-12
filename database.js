const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://kevindsimsjr:tHE1Hp0ruqgHbggi@cluster0.jxlqvga.mongodb.net/?retryWrites=true&w=majority';
console.log(`Mongo URI: ${mongoURI}`); // Added to debug

const options = { useNewUrlParser: true, useUnifiedTopology: true };

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, options);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;

python main.py app_id=0eae2f6c-389b-4f15-aa39-81a8208cb067
