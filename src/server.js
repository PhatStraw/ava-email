require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const app = express();
app.use(express.json());

const connectDB = require('./db/mongoose');

// Connect to MongoDB
connectDB().then(() => {
  const { setupEmailListener } = require('./utils/emailListenerUtil');
  setupEmailListener();

  const emailScheduler = require('./jobs/emailScheduler');
  emailScheduler.start();

  const conversationRoutes = require('./routes/conversation.routes');
  app.use('/api/conversations', conversationRoutes);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
