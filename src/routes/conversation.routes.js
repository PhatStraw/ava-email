const express = require('express');
const router = express.Router();
const conversationController = require('../controllers/conversationController');

router.post('/message/new', async (req, res) => {
  try {
    const { email, message } = req.body;
    if (!email || !message) {
      return res.status(400).send('Email and message are required.');
    }
    await conversationController.handleNewCustomerMessage(email, message);
    res.status(200).send('Message received and processed.');
  } catch (error) {
    res.status(500).send('Server error while processing message.');
  }
});

module.exports = router;
