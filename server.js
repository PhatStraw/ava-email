require('dotenv').config();
const express = require('express');
const app = express();
app.use(express.json());

const connectDB = require('./database');

// Connect to MongoDB
connectDB();

const emailScheduler = require('./jobs/emailScheduler');
emailScheduler.start();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

